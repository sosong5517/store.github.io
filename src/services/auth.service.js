const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const SysUser = require('../models/user.model');
const bcrypt = require('bcryptjs');
const logEvent = require('../events/myEmitter');
const md5 = require('md5')
const redisService = require('./RedisService')

dotenv.config();

class AuthService {
    async authenticate(user) {
        const { userName, userPassword } = user;
        let authUser;
        try {
            authUser = await SysUser.findOne({
                where: {
                    userName: userName,
                }
            });
            const matchPassword = bcrypt.compareSync(userPassword, authUser.userPassword);
            if (matchPassword) {
                const expiresIn = process.env.JWT_EXPIRED;
                console.log('auth gua', authUser.userName)
                const sessionId = md5(authUser.userName);

                const accessToken = jwt.sign({ sessionId }, process.env.SECRET_KEY, { expiresIn });
                await redisService.set({ key: sessionId, value: authUser.id, expiresIn })

                authUser = {
                    user: {
                        userId: authUser.id,
                        userName: authUser.userName,
                        fullName: authUser.fullName,
                        email: authUser.email
                    }, token: accessToken
                };
            } else {
                authUser = null;
            }
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'LOGIN-UESER-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return authUser;
    }


    async registerUser(user) {
        const { userName } = user;
        let result;
        const data = await SysUser.findOne({
            where: { userName: userName }
        })
        if (data) {
            result = {
                Message: "data user exist"
            }
            return result
        }

        var { userPassword } = user
        user.userPassword = bcrypt.hashSync(userPassword, 8)

        try {

            result = await SysUser.create(user)

        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'REGISTER-USER-SERVICE-FAILED',
                logMessage: e
            })

        }
        console.log('hasil', result)
        return result

    }
    async getMyUser(id) {

        let result;
        try {
            result = await SysUser.findOne({
                where: { id: id }
            })
        } catch (e) {

            logEvent.emit('APP-ERROR', {
                logTitle: 'SERVICE ERR',
                logTitle: 'GET MY USER FAILED',
                logMessage: e
            }
            )

        }

        return result;
    }
    async getAllUsers() {
        let result;
        try {
            result = await SysUser.findAll()

        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'SERVICE ERR',
                logTitle: 'GET ALL USERS FAILED',
                logMessage: e
            }
            )
        }
        return result;
    }
    async deleteUser(id) {
        console.log('del user', id)
        let result;
        try {
            result = await SysUser.destroy({
                where: {
                    id: id
                }
            })
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'SERVICE ERR',
                logTitle: 'GET ALL USERS FAILED',
                logMessage: e
            }
            )

        }
        return result;
    }

    async updateUser(id, data) {
        let result;
        const dataUser = await SysUser.findOne({
            where: { id: id }
        })
        try {

            if (dataUser) {
                dataUser.id = data.id;
                dataUser.userName = data.userName;
                dataUser.userPassword = dataUser.userPassword;
                dataUser.fullName = data.fullName;
                result = await dataUser.save()

            }

        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'SERVICE ERR',
                logTitle: 'GET ALL USERS FAILED',
                logMessage: e
            }
            )
        }
        return result

    }

    async validationSession(sessionId) {
        console.log("data sesison", sessionId)
        const sessionID = await redisService.get(sessionId);
        console.log("sesssion kita", sessionID)


      //  return sessionID;
      //  const employee = await this.getMyUser(sessionID);
        return !!sessionID;

    }



}



module.exports = AuthService;