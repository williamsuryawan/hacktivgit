const baseURL = 'http://localhost:3000';

$(document).ready(function() {
    $.ajax({
        url: `${baseURL}/repositories/starred`,
        method: 'GET'
    
    })
    .done(function(repos) {
        // console.log("Data ditemukan", repos)
        let html = ''
        for(let i=0; i<repos.length; i++) {
            // console.log(repos[i])
            name =''
            let repo = repos[i]
            name = repo.full_name.split('/')[0]
            html += `<li><strong>Repo Name:</strong> ${repo.name}  || <strong>Owner:</strong> ${name}</li>`
        }
        $('#starredrepo-list').prepend(html);
    })
    .fail(function(err) {
        console.log("Data error", err)
    }) 
})

$(document).ready(function() {
    $.ajax({
        url: `${baseURL}/repositories?username=williamsuryawan`,
        method: 'GET'
    
    })
    .done(function(myrepos) {
        // console.log("Data ditemukan", myrepos)
        let name= ''
        let html = ''
        for(let i=0; i<myrepos.length; i++) {
            // console.log(myrepos[i])
            const repo = myrepos[i]
            name = repo.full_name.split('/')[0]
            html += `<li>${repo.name} <a href="${repo.clone_url}" target="_blank">SHOW</a></li>`
        }
        // console.log("looping selesai=====", name)
        $('#repo-owner').append(name)
        $('#myrepo-list').prepend(html);
    })
    .fail(function(err) {
        console.log("Data error", err)
    }) 
})

$('#add-repo-form').submit(function() {
    event.preventDefault();
    let input = {
        name: $('#name').val(),
        private: false
    }
    console.log("add ===>", input)
        $.ajax({
            method: 'POST',
            url: `${baseURL}/repositories`,
            data: {
                name: $('#name').val(),
                private: false
            }
        })
        .done (newRepo => {
            ('$repo-list').append(`<li>${newRepo.full_name}</li>`)
        })
        .fail(err => {
            console.log(err)
        })
})

$('#unstar-repo-form').submit(function() {
    event.preventDefault();
    console.log("unstar repo");
    
    let inputName = $('#userName').val();
    let inputRepo = $('#repoName').val();
    console.log("input: ", inputName, inputRepo);
    let inputLink = `${baseURL}/repositories/unstar?username=${inputName}&repo=${inputRepo}`
    console.log(inputLink)
        $.ajax({
            method: 'DELETE',
            url: inputLink, 
        })
        .done (function(repo) {
                console.log("berhasil delete", repo)
                repoChange();
        })
        .fail(function(e) {
            console.log(e)
        })
})

function findOtherRepo(value) {
    console.log("cari repo orang lain", value)
    let linkOtherRepo = `${baseURL}/repositories?username=${value}`
    $.ajax({
        url: linkOtherRepo,
        method: 'GET'
    })
    .done(function(otherrepos) {
        // console.log("Data ditemukan", myrepos)
        let name= ''
        let html = ''
        for(let i=0; i<otherrepos.length; i++) {
            console.log(otherrepos[i])
            const repo = otherrepos[i]
            name = repo.full_name.split('/')[0]
            html += `<li>${repo.name} <a href="${repo.clone_url}" target="_blank">SHOW</a></li>`
        }
        // console.log("looping selesai=====", name)
        $('#otherrepo-list').empty();
        $('#otherrepo-owner').empty();
        $('#otherrepo-owner').append(name)
        $('#otherrepo-list').prepend(html);
    })
    .fail(function(err) {
        console.log("Data error", err)
    }) 
}

function repoChange(value) {
    console.log("ada value=", value)
    let halaman = `${baseURL}/repositories/starred`
    if (value) {
        halaman = `${baseURL}/repositories/starred?name=${value}`
        console.log("masuk====")
    }
    console.log(halaman, 'halaman')
    console.log(value, 'value')
    $.ajax({
        url: halaman,
        method: 'GET'
    })
    .done(function (data) {
        console.log(data, 'data')
        let html = ''
        let name = ''
        data.forEach(result => {
            name=''
            name = result.full_name.split('/')[0]
            
            html += `<li><strong>Repo Name:</strong> ${result.name}  || <strong>Owner:</strong> ${name}</li>`
        })
        // console.log(html, 'html')
        $('#starredrepo-list').empty()
        $('#starredrepo-list').append(html)
    })
    .fail(function (err) {
        console.log(err)
    })
 }