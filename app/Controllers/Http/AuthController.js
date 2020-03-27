'use strict'
const { validate } = use('Validator')
const User = use('App/Models/User')

class AuthController {
    /**
     * Login function
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async login({request, auth, response}){
        const rules = {
            email: 'required|email',
            password: 'required'
        }

        const validation = await validate(request.all(), rules)
        if(validation.fails()){
            return response.status(401).json({
                status: 'error',
                message: validation.messages()
            })
        }
        else{
            const body = request.post()
            const token = await auth.attempt(body.email, body.password)
            return token 
        }
    }

    async register({request, response}){
        const rules = {
            username: 'required',
            email: 'required|email|unique:users,email',
            password: 'required'
        }
        const body = request.post()
        const validation = await validate(request.all(), rules)

        if(validation.fails()){
            return response.status(401).json({
                status: 'error',
                message: validation.messages()
            })
        }
        else{
            try{
                const newUser = await User.create({
                    username: body.username,
                    email: body.email,
                    password: body.password
                })
                return response.json(newUser)
            } catch(e){
                throw e
            }
        }
    }
}

module.exports = AuthController
