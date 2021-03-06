const express = require('express');
const app = express()
const fs = require('fs')
const {createCanvas, loadImage} = require('canvas')
const mysql = require('mysql');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');


app.use(cors())
app.use(express.json())
app.use(express.static('upload'));
const width = 1200
const height = 630


const canvas = createCanvas(width, height)
const context = canvas.getContext(`2d`)


app.post('/addUser', (req, res) => {

    db.query('insert into users values (?,?,"https://filestore.community.support.microsoft.com/api/images/f2e55cbf-8316-4d3a-9412-ecd8194b2a72?upload=true")',
        [req.body.login, req.body.password_string],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(`user ${req.body.login} has been added (server)`)
            }
        })


})

app.post('/add_like', (req, res) => {

    db.query('insert into likes (from_login,id_animation) values (?,?)',
        [req.body.from_login, req.body.id_animation],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('all is ok')
            }
        })


})

app.post('/change_avatar', (req, res) => {

    db.query('update users set avatar = ? where login = ?',
        [req.body.avatar, req.body.login],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('all is ok')
            }
        })


})

app.get('/user_info/:login', (req, res) => {
    //console.log(req.params.login)
    const userInfo = {
        login: req.params.login,
        avatar: '',
        animations: [{
            id: 0,
            title: '',
            description: '',
            likes: 0,
            postDate: Date.now(),
            visibility: true,
            frames: [{
                indexFrame: '',
                src: ''
            }]
        }],
    }
    db.query(`select * from users where login='${req.params.login}'`,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                userInfo.avatar = result[0].avatar
                db.query(`select * from animation where login='${req.params.login}'`,
                    (err, result1) => {
                        if (err) {
                            console.log(err)
                        } else {
                            userInfo.animations.pop()
                            //  console.log('???? ??????????')

                            result1.forEach(elem => {
                                    const newFrames = []
                                    // console.log('?????????? ??????????')
                                    db.query(`select * from frames where id_animation=${elem.id}`,
                                        (err, result) => {
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                // console.log('?????????? ?????????? ?? ??????????')


                                                try {
                                                    result.forEach(framesElems => {
                                                        const newPath = Buffer.from(fs.readFileSync(`./framesDB/frames${elem.id}/${framesElems.path.substr(2)}`)).toString('base64')
                                                        const newElem = {indexFrame: framesElems.index_frame, src: newPath}
                                                        // console.log(newElem)
                                                        //console.log(newFrames)
                                                        // newFrames.push(newElem)
                                                        newFrames.push(newElem)
                                                        //console.log(newFrames)
                                                        //console.log('newFrames',newFrames)


                                                    })
                                                    //console.log('newFrames', newFrames)

                                                    userInfo.animations.push({
                                                        id: elem.id,
                                                        title: elem.title,
                                                        description: elem.description,
                                                        likes: elem.likes,
                                                        postDate: elem.post_date,
                                                        visibility: elem.visibility,
                                                        frames: newFrames,
                                                    })
                                                } catch (e) {
                                                    console.error(e)
                                                }
                                                if (userInfo.animations.length === result1.length) {
                                                    // console.log('all done', userInfo)
                                                    res.send(userInfo)
                                                }
                                                //  console.log(userInfo)
                                            }
                                        }
                                    )


                                    //console.log('?????????? ??????????')
                                }
                            )


                        }
                    }
                )
                // res.send(result)
            }
        })


})

app.post('/saveAnimation', (req, res) => {
    let newAnimationId;
    db.query('select max(id) from animation',
        (err, result) => {
            if (err) {
                console.log(err)
                //res.send('1')
            } else {
                console.log('result isss... ')
                //console.log(result[0]['max(id)'])
                if (result[0]['max(id)'] === undefined)
                    newAnimationId = 1
                else newAnimationId = result[0]['max(id)'] + 1
                const newDate = `${(new Date(Date.now())).getFullYear()}-${(new Date(Date.now())).getMonth()}-${(new Date(Date.now())).getDate()}`
                db.query('insert into animation values (?,?,?,?,?,?,?)',
                    [newAnimationId, req.body.login, req.body.title === '' ? '?????? ????????????????' : req.body.title, req.body.description === '' ? '?????? ????????????????' : req.body.description, 0, newDate, 1],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                            //res.send('1')
                        } else {
                            console.log('saving frames...')
                            //console.log(req.body.animationFrames[0].getAttribute('src'))
                            // console.log(req.body.animationFrames)
                            // console.log(req.body.animationFrames[0])
                            setTimeout(() => {
                            }, 100)
                            process.chdir(__dirname)
                            fs.opendir(__dirname, () => {
                            })


                            process.chdir(`./framesDB`)
                            fs.opendir(`./framesDB`, () => {
                            })

                            fs.mkdir(`./frames${newAnimationId}`, (err) => {
                                if (err) {
                                    return console.error(err);
                                }

                                //console.log('Directory', `frames${newAnimationId}`, ' created successfully!');
                                process.chdir(__dirname)

                                process.chdir(`./framesDB/frames${newAnimationId}/`)
                                // console.log('Moved to ', `frames${newAnimationId}`, ' successfully!');


                                for (let i = 0; i < req.body.animationFrames.length; i++) {

                                    // ///////
                                    //
                                    // let sampleFile;
                                    // let uploadPath;
                                    //
                                    // // name of the input is sampleFile
                                    // sampleFile = req.body.animationFrames[i];// (!)
                                    // sampleFile.name = `${newAnimationId}/${i}`// (!)
                                    // uploadPath = __dirname + '/animationsBase/' + sampleFile.name;
                                    //
                                    // console.log(sampleFile);
                                    //
                                    // // Use mv() to place file on the server
                                    // sampleFile.mv(uploadPath, function (err) {
                                    //     if (err) return res.status(500).send(err);

                                    // console.log(`saving image ${[i]}...`)
                                    try {
                                        fs.writeFileSync(`frame${[i]}.jpg`, Buffer.from(req.body.animationFrames[i], 'base64'))
                                        //   console.log('successful saving')

                                    } catch (e) {
                                        console.error(e)
                                    }
                                    //console.log(`adding ${[i]}...`)


                                    // });
                                    db.query('insert into frames (id_animation, index_frame,path) values (?,?,?)',
                                        [newAnimationId, i, `./frame${[i]}.jpg`],
                                        (err, result) => {
                                            if (err) {
                                                console.log(err)
                                                //res.send('1')
                                            } else {

                                                //console.log('success!', `${newAnimationId}/${i}`)
                                                //res.send(`0`)
                                            }
                                        })

                                }
                                console.log('done')
                                res.send('0')

                            });


                        }
                    }
                )
            }
        })


})


app.get('/get_top_mults', (req, res) => {
    const topMults = [{
        id: 0,
        login: '',
        title: '',
        description: '',
        likes: 0,
        postDate: Date.now(),
        frames: [{
            indexFrame: '',
            src: ''
        }]
    }]

    db.query(`select animation.id id,animation.login login, animation.title title, animation.description description, count(likes.from_login) likes, animation.post_date post_date,animation.visibility visibility  from animation join likes on animation.id=likes.id_animation group by likes.id_animation order by count(likes.from_login) desc `,
        (err, result1) => {
            if (err) {
                console.log(err)
            } else {
                topMults.pop()
                console.log('???? ??????????')
                result1.forEach(elem => {
                        const newFrames = []
                        console.log('?????????? ??????????')
                        setTimeout(() => {
                        }, 100)
                        process.chdir(__dirname)
                        fs.opendir(__dirname, () => {
                        })
                        db.query(`select * from frames where id_animation=${elem.id}`,
                            (err, result) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    const iterations = 0
                                    const anon = () => {
                                        try {
                                            setTimeout(() => {
                                            }, 1000)
                                            result.forEach(framesElems => {
                                                    console.log('?????????? ?????????? ?? ?????????? inside anon')
                                                    const newPath = Buffer.from(fs.readFileSync(`framesDB/frames${elem.id}/${framesElems.path.substr(2)}`)).toString('base64')
                                                    const newElem = {indexFrame: framesElems.index_frame, src: newPath}
                                                    // console.log(newElem)
                                                    //console.log(newFrames)
                                                    // newFrames.push(newElem)
                                                    newFrames.push(newElem)
                                                    //console.log(newFrames)
                                                    //console.log('newFrames',newFrames)

                                                }
                                            )
                                        } catch (e) {
                                            console.error(e)
                                        }
                                        return newFrames
                                    }
                                    console.log('???? ???????? ???????????? ?????????????????? ????????????????')
                                    topMults.push({
                                        id: elem.id,
                                        login: elem.login,
                                        title: elem.title,
                                        description: elem.description,
                                        likes: elem.likes,
                                        postDate: elem.post_date,
                                        visibility: elem.visibility,
                                        frames: anon(),
                                    })
                                    console.log('?? ??????????????.', topMults)


                                    //console.log('newFrames', newFrames)


                                    if (topMults.length === result1.length) {
                                        console.log('???????????????????? ??????????????????!')
                                        // while (topMults[topMults.length-1].frames.length===0)
                                        // {
                                        //     console.log("?? ???? ???????? ???? ???????????????????? ????????????????!")
                                        //     topMults[topMults.length-1].frames=newFrames
                                        // }
                                        if (topMults[topMults.length - 1].frames.length !== 0) {
                                            console.log('all done', topMults)
                                            res.send(topMults)
                                        } else {
                                            console.log('smth wrong')
                                        }

                                    } else {
                                        console.log('???? ?????? ????????????.')
                                    }
                                    //console.log(topMults)
                                }
                            }
                        )


                        //console.log('?????????? ??????????')
                    }
                )


            }
        }
    )
    // res.send(result)


})


app.get('/get_new_mults', (req, res) => {
    const newMults = [{
        id: 0,
        login: '',
        title: '',
        description: '',
        likes: 0,
        postDate: Date.now(),
        frames: [{
            indexFrame: '',
            src: ''
        }]
    }]

    db.query(`select * from animation order by post_date  `,
        (err, result1) => {
            if (err) {
                console.log(err)
            } else {
                newMults.pop()
                console.log('???? ??????????')
                result1.forEach(elem => {
                        const newFrames = []
                        console.log('?????????? ??????????')
                        process.chdir(__dirname)
                        fs.opendir(__dirname, () => {
                        })
                        db.query(`select * from frames where id_animation=${elem.id}`,
                            (err, result) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    const iterations = 0
                                    const anon = () => {
                                        try {
                                            result.forEach(framesElems => {
                                                    console.log('?????????? ?????????? ?? ?????????? inside anon')
                                                    const newPath = Buffer.from(fs.readFileSync(`framesDB/frames${elem.id}/${framesElems.path.substr(2)}`)).toString('base64')
                                                    const newElem = {indexFrame: framesElems.index_frame, src: newPath}
                                                    // console.log(newElem)
                                                    //console.log(newFrames)
                                                    // newFrames.push(newElem)
                                                    newFrames.push(newElem)
                                                    //console.log(newFrames)
                                                    //console.log('newFrames',newFrames)

                                                }
                                            )
                                        } catch (e) {
                                            console.error(e)
                                        }
                                        return newFrames
                                    }
                                    console.log('???? ???????? ???????????? ?????????????????? ????????????????')
                                    newMults.push({
                                        id: elem.id,
                                        login: elem.login,
                                        title: elem.title,
                                        description: elem.description,
                                        likes: elem.likes,
                                        postDate: elem.post_date,
                                        visibility: elem.visibility,
                                        frames: anon(),
                                    })
                                    console.log('?? ??????????????.', newMults)


                                    //console.log('newFrames', newFrames)


                                    if (newMults.length === result1.length) {
                                        console.log('???????????????????? ??????????????????!')
                                        console.log('?????????? ????????????!!!!')
                                        console.log('?????????? ????????????!!!!')
                                        console.log('?????????? ????????????!!!!')
                                        console.log('?????????? ????????????!!!!')
                                        // while (topMults[topMults.length-1].frames.length===0)
                                        // {
                                        //     console.log("?? ???? ???????? ???? ???????????????????? ????????????????!")
                                        //     topMults[topMults.length-1].frames=newFrames
                                        // }
                                        if (newMults[newMults.length - 1].frames.length !== 0) {
                                            console.log('all done', newMults)
                                            res.send(newMults)
                                        } else {
                                            console.log('smth wrong')
                                        }

                                    } else {
                                        console.log('???? ?????? ????????????.')
                                    }
                                    //console.log(topMults)
                                }
                            }
                        )


                        //console.log('?????????? ??????????')
                    }
                )


            }
        }
    )
    // res.send(result)


})

app.post('/verification', (req, res) => {
    db.query('select * from users', [],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                const row = result.find(row => row.login === req.body.login)
                console.log(row)
                row !== undefined ?
                    row.password_string === req.body.password_string ?
                        res.send('0') :
                        res.send('1') :
                    res.send('2')

            }
        })


})

app.get('/comments', (req, res) => {
    //console.log(req.params.login)

    db.query(`select * from comments`,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log('?????????????? ?????????????????? comments', result)
                res.send(result)


            }
        })


})

app.get('/get_avatar/:login', (req, res) => {
    console.log('?????????? ?????? ??????????????', req.params.login)

    db.query(`select avatar from users where login = "${req.params.login}"`,
        (err, result) => {
            if (err) {
                console.log(err)

            } else {

                // console.log('?????????????? ?????????????????? avatar',result[0].avatar)
                try {
                    res.send(result[0].avatar)
                } catch (e) {
                    res.send('https://filestore.community.support.microsoft.com/api/images/f2e55cbf-8316-4d3a-9412-ecd8194b2a72?upload=true')
                }


            }
        })


})

app.post('/add_comment', (req, res) => {
    const newDate = `${(new Date(Date.now())).getFullYear()}-${(new Date(Date.now())).getMonth()}-${(new Date(Date.now())).getDate()}`

    db.query(`insert into comments (from_login,comment_body,id_animation,post_date) values ('${req.body.from_login}','${req.body.comment_body}','${req.body.id_animation}','${newDate}')`,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                // const row = result.find(row => row.login === req.body.login)
                // console.log(row)
                // row !== undefined ?
                //     row.password_string === req.body.password_string ?
                //         res.send('0') :
                //         res.send('1') :
                //     res.send('2')
                console.log('comment was added')
            }
        })


})


app.get('/likes/:id_animation/:from_login', (req, res) => {
    //console.log(req.params.login)

    db.query(`select * from likes where from_login='${req.params.from_login}' and id_animation=${req.params.id_animation}`,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log('?????????????? ?????????????????? ??????????', result)
                if (result.length === 0) {
                    res.send(false)
                } else {
                    res.send(true)
                }


            }
        })


})

app.get('/likes_count/:id_animation', (req, res) => {
    //console.log(req.params.login)

    db.query(`select count(id) amount from likes where id_animation=${req.params.id_animation}`,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log('?????????????? ?????????????????? ????????????', result)
                if (result.length !== 0) {
                    res.send(result[0].amount.toString())
                } else {
                    res.send('0')
                }


            }
        })


})


app.delete('/del_like/:id_animation/:from_login', (req, res) => {
    db.query(`delete from likes where id_animation = ${req.params.id_animation} and from_login= "${req.params.from_login}"`, (err, result) => {
        if (err)
            console.log(err)
        else
            res.send(result)
    })
})

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '1111',
    database: 'animator'
})


app.listen(3001, () => {
    console.log("server start on port 3001 ")
})

