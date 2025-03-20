const express = require('express')
const app = express()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
app.use(express.json())
app.post('/profile', upload.single('file'), function (req, res, next) {
    res.json({msg:"Uploaded Successfully"})
  })
app.listen(3000,()=>{
    console.log("Server running on 3000 PORT")
})