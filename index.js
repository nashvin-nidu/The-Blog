import express from "express";
import {log} from "console";
import bodyParser from "body-parser";

const app = express();
const port = 2000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


// let articleContent;
// let articlesContentObjPath = [];
// let articleContentArr = [];
let articlesListed = [];
let flag = 0;

// let articleListedLength = articlesListed.length
// log(articleListedLength)

app.get("/", (req, res) => {
    if(flag === 0){
        res.render("index.ejs", {
            flag: flag
        } );
    }else{
        res.render("index.ejs", { article: articlesListed,
            flag: flag
        });
        log(articlesListed);
    }
});


app.post("/new-article", (req, res) => {

    const articleInfo = {
        title: req.body["title"],
        content: req.body["article"]
    }

    articlesListed.push(articleInfo);
    flag = 1;
 
    // log(articlesListed);
    // articleTitle = req.body["title"];
    // let articleId = articleTitle.replace(/\s/g, '-');
    // articlesListed.push({article: `<br><a id="${articleId}" href="/${articleTitle}">${articleTitle}</a>`});
 
    // articlesContentObjPath = "/" + req.body["title"] + "1";
    // log(articlesContentObjPath);
    // articleContent = req.body["article"];
    // articleContentArr.push({articlesContentObjPath: `<h5>${articleContent}</h5>`});
    // log(articleContentArr);


    res.redirect('/')

});



app.get("/article/:id", (req, res) => {
    const articleId = req.params.id;
    const article = articlesListed[articleId];
    log(articlesListed);
    log(article);
    res.render("article.ejs", { article: article,
        articleId: articleId
     })
});

                  
//Article Delete
app.get("/article/:id/delete", (req, res) => {
    const articleId = req.params.id;

    articlesListed.splice(articleId,1);
    log(articlesListed);

// console.log(arr);
//     article = newArticeInfo;
    res.redirect("/")
});

//Article Edit
app.get("/article/:id/edit", (req, res) => {
    const articleId = req.params.id;
    const article = articlesListed[articleId];
    res.render("edit.ejs", { article: article })
});


app.post("/article/:id/edited", (req, res) => {
    const articleId = req.params.id;
    //Not needed 👇🏻
    let article = articlesListed[articleId];

    const newArticleInfo = {
        title: req.body["title"],
        content: req.body["article"]
    }

    articlesListed[articleId] = newArticleInfo;

// console.log(arr);
//     article = newArticeInfo;
    res.redirect("/article/:id")
})








// //Here this is used to get the url 
// let urlOf = " ";
// const urlGetter = (req, res, next) => {
//     urlOf = req.url;
//     log(urlOf)
//     next();
//   }
  
//   app.use(urlGetter);


//   app.get(urlOf, (req, res) => {
//     res.render("article.ejs", {
//         articlTitle: articles,
//         articleContent: articleContentArr[urlOf]
//     });
// });





  //here this is used as expirement to know this work as given post. (Read docs and reserch about Post And Get)
  //Current knowlodge get to get resourses from server and post to give resourse and do something with resourse in sever and can return.
//   app.post(`/${urlOf}`, (req, res) => {
//     res.render("article.ejs");
//   })

// Here this specify that that when the endpoint called it should go there and upload the article.ejs and with object we add the content and titele. thats the expected outcome.
//But here we need to specify the object, the exact path and get the data
// Adding articles to the file



// res.redirect("/");

// let selectedArticle = `${url}`
// app.post()


app.listen(port, () =>{
    log(`Your server is running on: ${port}`)
});

