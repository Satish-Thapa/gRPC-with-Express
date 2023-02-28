//https://daily.dev/blog/build-a-grpc-service-in-nodejs
const express = require("express");
const app = express();
const port = 8080;
const client = require("./client");

app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

app.get("/news", function (req, res) {
    client.getAllNews({}, (error, news) => {
        if (error) console.log(error);
        res.send(news);
    });
});

app.get("/:id", function (req, res) {
    client.getNews(
        {
            id: req.params.id,
        },
        (error, news) => {
            if (error) console.log(error);
            res.send(news);
        }
    );
});

app.post("/news", function (req, res) {
    console.log( req.body.body);
    client.addNews(
        {
            body: req.body.body,
            postImage: req.body.postImage,
            title: req.body.title,
        },
        (error, news) => {
            if (error) throw error;
            res.send({ data: news, msg: "Successfully created a news." });
        }
    );
});

app.put("/:id", function (req, res) {
    client.editNews(
        {
          id: req.params.id,
          body: req.body.body,
          postImage: req.body.postImage,
          title: req.body.title,
        },
        (error, news) => {
          if (error) throw error;
          res.send(news);
        }
      );
});

app.delete("/:id", function (req, res) {
    client.deleteNews(
        {
          id: req.params.id,
        },
        (error, news) => {
          if (error) throw error;
          res.end({ msg: "Successfully deleted a news item." });
        }
      );
});



app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});