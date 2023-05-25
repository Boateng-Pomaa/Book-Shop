#!/usr/bin/env node

import { program } from 'commander'
import { adminModel } from './models/adminSchema.js'
import {userModel} from './models/userSchema.js'


program.command('create-admin <username> <password>')
    .description('Create an admin user')
    .action(async (username, password) => {
        try {
            const admin = await adminModel.create({
                username,
                password,
                role:"admin"
            })
            console.log(`admin created succcessfully: ${admin}`)
        } catch (error) {
            console.log(error)
        }
    })



    program.command('create-admin <username> <password>')
    .description('Create a regular user')
    .action(async (username, password) => {
        try {
            const user = await userModel.create({
                username,
                password,
                role:"user"
            })
            console.log(`user created succcessfully> ${user}`)
        } catch (error) {
            console.log(error)
        }
    })


    program.parse(process.argv)