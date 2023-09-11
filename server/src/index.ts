import AdminJS from 'adminjs'
import * as AdminJSMongoose from '@adminjs/mongoose'
import AdminJSExpress from '@adminjs/express'
import mongoose from 'mongoose'


import express from 'express'
import { Category } from './Category.model.js'

const PORT = 3000
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})
const start = async () => {
  await mongoose.connect('mongodb+srv://sv:abcabc@cluster0.ft5ithh.mongodb.net/?retryWrites=true&w=majority')
  const app = express()

  const admin = new AdminJS({
    resources: [Category]
  })

  const adminRouter = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()
