import org.apache.spark.ml.evaluation.RegressionEvaluator
import org.apache.spark.ml.recommendation.ALS
import java.util.Properties
import org.apache.spark.sql.SQLContext
//import org.apache.spark.SparkContext
import org.apache.http.impl.client.HttpClientBuilder
import org.apache.http.HttpHeaders
import org.apache.http.entity.StringEntity
import org.apache.commons.io.IOUtils
import org.apache.http.client.methods.HttpPost
import spark.implicits._
import scala.util.parsing.json._
import com.google.gson.Gson;

// case class Rating(userId: Int, movieId: Int, rating: Float, timestamp: Long)
// def parseRating(str: String): Rating = {
//   val fields = str.split(",")
//   assert(fields.size == 4)
//   Rating(fields(0).toInt, fields(1).toInt, fields(2).toFloat, fields(3).toLong)
// }
// val sc = new org.apache.spark.SparkContext()
val sqlContext = new org.apache.spark.sql.SQLContext(sc)
//val movieDB = sqlContext.read.format("jdbc").option("url", "jdbc:mysql://localhost:3306/database_development?characterEncoding=UTF-8&serverTimezone=UTC").option("dbtable", "movies").option("user", "root").option("password", "asdasd2134").load()

val ratingDB = sqlContext.read.format("jdbc").option("url", "jdbc:mysql://localhost:3306/database_development?characterEncoding=UTF-8&serverTimezone=UTC").option("dbtable", "ratings").option("user", "root").option("password", "asdasd2134").load()

// scala> dataframe_mysql.registerTempTable("names")
// 4. We are now in a position to run some SQL such as

// scala> dataframe_mysql.sqlContext.sql("select * from names").collect.foreach(println)

//val ratings = spark.read.textFile("spark/data/mllib/als/sample_movielens_ratings.txt")
// val ratings = spark.read.textFile("../Download/data/rating.csv")
//   .map(parseRating)
//   .toDF()
val Array(training, test) = ratingDB.randomSplit(Array(0.8, 0.2))

// Build the recommendation model using ALS on the training data
val als = new ALS()
  .setMaxIter(5)
  .setRegParam(0.01)
  .setUserCol("user_id")
  .setItemCol("movie_id")
  .setRatingCol("rating")
val model = als.fit(training)

// Evaluate the model by computing the RMSE on the test data
// Note we set cold start strategy to 'drop' to ensure we don't get NaN evaluation metrics
model.setColdStartStrategy("drop")
//val predictions = model.transform(test)

// val evaluator = new RegressionEvaluator()
//   .setMetricName("rmse")
//   .setLabelCol("rating")
//   .setPredictionCol("prediction")
// val rmse = evaluator.evaluate(predictions)
// println(s"Root-mean-square error = $rmse")

// Generate top 10 movie recommendations for each user
//val userRecs = model.recommendForAllUsers(10)
// Generate top 10 user recommendations for each movie
//val movieRecs = model.recommendForAllItems(10)

val dF = Seq(148).toDF("user_id");
val userSubsetRecs = model.recommendForUserSubset(dF, 10)
val sendData = userSubsetRecs.select("recommendations").toJSON.take(2)(0)
val df = spark.read.json(Seq(sendData).toDS())

val client = HttpClientBuilder.create().build()
val post = new HttpPost("http://localhost:3002")
post.addHeader(HttpHeaders.CONTENT_TYPE,"application/json")
post.setEntity(new StringEntity(sendData))
val response = client.execute(post)
// val entity = response.getEntity()
// println(Seq(response.getStatusLine.getStatusCode(), response.getStatusLine.getReasonPhrase()))
// println(IOUtils.toString(entity.getContent()))



// Generate top 10 movie recommendations for a specified set of users
//val users = ratingDB.select(als.getUserCol).distinct().limit(3)
//val userSubsetRecs = model.recommendForUserSubset(users, 10)
// Generate top 10 user recommendations for a specified set of movies
//val movies = ratingDB.select(als.getItemCol).distinct().limit(3)
//val movieSubSetRecs = model.recommendForItemSubset(movies, 10)
