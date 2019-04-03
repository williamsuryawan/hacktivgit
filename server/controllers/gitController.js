const axios = require('axios');
const github = axios.create({
    baseURL: 'https://api.github.com'
})
github.defaults.headers.common['Authorization'] = process.env.token


class GitController {
    static findStar (req,res) {
        console.log("Masuk ke search starred repo: ", req.query)
        github
            .get('/user/starred')
            .then(({data}) =>{
                if(req.query && req.query.name) {
                    console.log("Ada req.query")
                    data = data.filter(repo => repo.name.includes(req.query.name))
                }
                res.status(200).json(data)
            })
            .catch(e => {
                console.log("Terjadi error =====>",e)
                res.status(500).json({message: "ERROR!"})
            })
    }

    static createRepo (req,res) {
        const newRepo ={
            name: req.body.name,
            private: false
        }
        console.log("Input add new repo ===>", newRepo)
        github
            .post('/user/repos', {...newRepo})
            .then(({data}) => {
                console.log("Sukses Add =====>", data)
                res.json(data)
            })
            .catch(e => {
                // console.log(util.inspect(e, {showHidden: false, depth: null}))
                res.status(500).json({message: "ERROR!"})
            })
    }

    static findRepo (req,res) {
        console.log("input menuju search", req.query, req.params, req.headers.authorization)
        // console.log()
        if(Object.keys(req.query)[0] == "username") {
            console.log("masuk sini", Object.keys(req.query))
            github
                .get(`/users/${req.query.username}/repos`)
                .then(response =>{
                    res.status(201).json(response.data)
                })
                .catch(err => {
                    console.log("Terjadi error =====>",err.message)
                    res.status(500).json({message: "ERROR!"})
                })
        } else {
            github
                .get('/user/repos')
                .then(response =>{
                    res.status(201).json(response.data)
                })
                .catch(err => {
                    console.log("Terjadi error =====>",err.message)
                    res.status(500).json({message: "ERROR!"})
                })
        }
    }

    static searchRepo (req,res) {

    }
    static unstarRepo (req,res) {
        console.log("masuk unstar repo ===", req.query)
        github
            .delete(`/user/starred/${req.query.username}/${req.query.repo}`)
            .then(response =>{
                res.json(response.data)
            })
            .catch(err => {
                console.log("Terjadi error =====>",err.message)
                res.status(500).json({message: "ERROR!"})
            })
    }
}

module.exports = GitController