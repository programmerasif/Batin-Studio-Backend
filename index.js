const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const app = express()
const port = process.env.PORT || 5001;
const cors = require('cors');

// app.use(cors());
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
const uri = "mongodb://fozlerabbi:ArqAegN9Zqv3pZqQ@ac-rjynr1b-shard-00-00.ai568b9.mongodb.net:27017,ac-rjynr1b-shard-00-01.ai568b9.mongodb.net:27017,ac-rjynr1b-shard-00-02.ai568b9.mongodb.net:27017/?ssl=true&replicaSet=atlas-116jfm-shard-0&authSource=admin&retryWrites=true&w=majority"
// const uri = "mongodb+srv://fozlerabbi:ArqAegN9Zqv3pZqQ@cluster0.ai568b9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const ThirdSecCollection = client.db("batinStudio").collection("ThirdSecData");
    const portfolioDataCollection = client.db("batinStudio").collection("portfolioData");
    const SixSecScrollDataCollection = client.db("batinStudio").collection("SixSecScrollData");
    const aboutDataCollection = client.db("batinStudio").collection("aboutData");
    const homePageFourthSectionData = client.db("batinStudio").collection("homePageFourthSectionData");
    const sixSecAllProjectData = client.db("batinStudio").collection("sixSecAllProjectData");


    //=======================>>>>>>> ThirdSec section GET API connect with [ useThirdSec Hooks ]
    app.get("/ThirdSec", async (req, res) => {
      const result = await ThirdSecCollection.find().toArray();
      res.send(result)
    })
    //=======================>>>>>>> ThirdSec section PATCH API connect with [ ThirdSec.js ]
    app.patch("/ThirdSec/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const query = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          headline: data?.headline,
          firstPara: data?.firstPara,
          secondPara: data?.secondPara
        }
      }
      const result = await ThirdSecCollection.updateOne(query, updatedDoc);
      res.send(result)
    })

    //=======================>>>>>>> homePageFourthSectionData section GET API connect with [ useHomePageFourthSectionData Hooks ]
    app.get("/homePageFourthSectionData", async (req, res) => {
      const result = await homePageFourthSectionData.find().toArray();
      res.send(result)
    })
    //=======================>>>>>>> ThirdSec section PATCH API connect with [ ThirdSec.js ]
    app.patch("/homePageFourthSectionData/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const query = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          title: data?.title,
          fristImage: data?.fristImage,
          secondImage: data?.secondImage,
          thirdImage: data?.thirdImage,
          fristLi: data?.fristLi,
          secondLi: data?.secondLi,
          thirdLi: data?.thirdLi,
        }
      }
      const result = await homePageFourthSectionData.updateOne(query, updatedDoc);
      res.send(result)
    })

     
    
     //=======================>>>>>>> SixSec section GET API with ID connect with [ SixSec.js  ]
    app.get("/SixSecScrollData/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await SixSecScrollDataCollection.findOne(query);
      res.send(result)
    })


      //=======================>>>>>>>   Portfolio Pages GET API connect with [ usePortfolio.js Hooks ]
      app.get("/Portfolio", async (req, res) => {
        const findDataStr = req.query.allDesign;
        console.log(findDataStr + " line number 95");
        const findData = findDataStr.split(',').map(value => value.trim().toLowerCase());
        if (findDataStr === "") {
          const result = await sixSecAllProjectData.find().toArray();
          console.log(result + " 99");
          res.send(result);
          return;
        }    
        const result = await sixSecAllProjectData.find({}).toArray();
        const filteredResult = result.filter(item =>
          findData.includes(item.projectTitle.toLowerCase())
        );
        res.send(filteredResult);
      });
    

     //=======================>>>>>>> aboutData section GET API  connect with [ useaboutSectio.js Hooks  ]
    app.get("/aboutData", async (req, res) => {
      const result = await aboutDataCollection.find().toArray();
      res.send(result)
    })
    //=======================>>>>>>> aboutData section Update API with ID connect with [ aboutSectio.js   ]
    app.patch("/aboutData/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const query = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          title: data?.title,
          firstPara: data?.firstPara,
          secondPara: data?.secondPara
        }
      }
      const result = await aboutDataCollection.updateOne(query, updatedDoc);
      res.send(result)
    })
   

    //=======================>>>>>>> SixSec section GET API connect with [ useSixSec.js Hooks ]
    app.get("/SixSecScrollData", async (req, res) => {
      const result = await SixSecScrollDataCollection.find().toArray();
      res.send(result)
    })
    //=======================>>>>>>> SixSecModal Update API with ID connect with [ SixSecModal.js   ]
    app.patch("/sixSecModal/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const query = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          title: data?.title,
            image: data?.image,
            description: data?.description
        }
      }
      const result = await SixSecScrollDataCollection.updateOne(query, updatedDoc);
      res.send(result)
    })



    // =========================================>>>>>>>>>>>>>>>>>>[[[[  CaseStudy API Start Here  ]]]]<<<<<<<<<<<<<<<<<====================================
    // =========================================>>>>>>>>>>>>>>>>>>[[[[  CaseStudy API Start Here  ]]]]<<<<<<<<<<<<<<<<<====================================
    
    
    // =========================================>>>>>>>>>>>>>>>>>> sixSecAllProjectData API [connect with useSixSecAllProjectData.js Hooks]
    app.get("/sixSecAllProjectData", async (req, res) => {
      const result = await sixSecAllProjectData.find().toArray();
      res.send(result)
    })

    // =========================================>>>>>>>>>>>>>>>>>> sixSecAllProjectData API [connect with useSixSecAllProjectData.js Hooks]
    app.get("/sixSecAllProjectSingleData/:id", async (req, res) => {
      const id = req.params.id;
        if(id){
          const query = {_id : new ObjectId(id)};
          const result = await sixSecAllProjectData.findOne(query);
          res.send(result)
        }  
    })

    // ==========================================>>>>>>> sixSecAllProjectData Update Api
    app.patch("/sixSecAllProjectData/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const query = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          projectTitle : data?.projectTitle,
          displayTitle : data?.displayTitle,
          displayDiscreption : data?.displayDiscreption,
          displayImage : data?.displayImage,
          SecondSecTitle : data?.SecondSecTitle,
          secondSecFirstLi : data?.secondSecFirstLi,
          secondSecSecondLi : data?.secondSecSecondLi,
          secondSecImage : data?.secondSecImage,
          thirdSecTitle : data?.thirdSecTitle,
          thirdSecFirstLi : data?.thirdSecFirstLi,
          thirdSecSecondLi : data?.thirdSecSecondLi,
          thirdSecImage : data?.thirdSecImage,
          forthSecFirstImage : data?.forthSecFirstImage,
          forthSecSecondImage : data?.forthSecSecondImage,
          forthSecThirdImage : data?.forthSecThirdImage,
          forthSecVideoUrl : data?.forthSecVideoUrl,
          forthSecForthImage : data?.forthSecForthImage,
          forthSecFifthImage : data?.forthSecFifthImage,
          FifthSecTitle : data?.FifthSecTitle,
          fifthSecDescription : data?.fifthSecDescription,
          fifthSecImage : data?.fifthSecImage,
          sixSecVideoUrl : data?.sixSecVideoUrl,
          sixSecFirstImage : data?.sixSecFirstImage,
          sixSecSecondImage : data?.sixSecSecondImage,
          sixSecThirdImage : data?.sixSecThirdImage,
          sixSecForthImage : data?.sixSecForthImage,
          sixSecFifthImage : data?.sixSecFifthImage,
          sevenSectionTitle : data?.sevenSectionTitle,
          sevenSectionImage : data?.sevenSectionImage,
          time : data?.time,
          siteLink : data?.siteLink
        }
      }
      const result = await sixSecAllProjectData.updateOne(query, updatedDoc);
      res.send(result)
    })

    app.post("/sixSecAllProjectData", async(req, res)=>{
      const data = req.body;
      const result = await sixSecAllProjectData.insertOne(data);
      res.send(result)
    })





    




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello, Express Server');
});

app.listen(port, () => {
  console.log(`Server is running on ==== http://localhost:${port}`);
});




