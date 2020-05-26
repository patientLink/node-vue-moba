const express = require("express")

const app = express()

app.set('secret', 'gfn23n43fj34nndsnf34nf3')

app.use(require('cors')({
  "exposedHeaders": 'User'
}))
app.use(express.json())

app.use('/admin', express.static(__dirname + '/admin'))
app.use('/web', express.static(__dirname + '/web'))
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)


app.listen(3000, () => {
  console.log('http://localhost:3000')
})