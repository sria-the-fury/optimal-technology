

function renderProjectList_ad(doc) {
    var project_list = document.getElementsByName('project_list')[0];

    let li = document.createElement('li');
    let p_name = document.createElement('span');
    let p_duration = document.createElement('span');
    let remaining = document.createElement('span');
    let created_time = document.createElement('span');

    var lol;
    var countDownDate = new Date(doc.data().project_duration_to + " 00:00:00").getTime();
    var from_date = new Date(doc.data().project_duration_from).getTime();

    var days = countDownDate - from_date;
    var total_days = Math.floor(days / (1000 * 60 * 60 * 24));


    var x = setInterval(function () {


        var now = new Date().getTime();


        var distance = countDownDate - now;


        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        lol = days + "day(s) ( " + hours + "hour " + minutes + "min " + seconds + "s)";
        if (distance < 0) {
            clearInterval(x);
            lol = "EXPIRED";
        }
        remaining.textContent = "Remaining : " + lol;
    }, 1000);




    li.setAttribute('id', doc.id);
    p_name.textContent = doc.data().project_name + " ( " + doc.data().client_name + " )";



    created_time.textContent = "Created at : " + doc.data().created_at;
    p_duration.textContent = "From : " + doc.data().project_duration_from + " → To : " + doc.data().project_duration_to + "(" + total_days + " days)";


    li.appendChild(p_name);
    li.appendChild(p_duration);
    li.appendChild(remaining);
    li.appendChild(created_time);
    project_list.appendChild(li);


}



function renderProjectList_tech(doc) {
    var project_list = document.getElementsByName('project_list')[1];
    let li = document.createElement('li');
    let p_name = document.createElement('span');
    let p_duration = document.createElement('span');
    let remaining = document.createElement('span');
    let created_time = document.createElement('span');

    var lol;
    var countDownDate = new Date(doc.data().project_duration_to + " 00:00:00").getTime();
    var from_date = new Date(doc.data().project_duration_from).getTime();

    var days = countDownDate - from_date;
    var total_days = Math.floor(days / (1000 * 60 * 60 * 24));


    var x = setInterval(function () {


        var now = new Date().getTime();


        var distance = countDownDate - now;


        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        lol = days + "day(s) ( " + hours + "hour " + minutes + "min " + seconds + "s)";
        if (distance < 0) {
            clearInterval(x);
            lol = "EXPIRED";
        }
        remaining.textContent = "Remaining : " + lol;
    }, 1000);




    li.setAttribute('id', doc.id);
    p_name.textContent = doc.data().project_name + " ( " + doc.data().client_name + " )";



    created_time.textContent = "Created at : " + doc.data().created_at;
    p_duration.textContent = "From : " + doc.data().project_duration_from + " → To : " + doc.data().project_duration_to + "(" + total_days + " days)";


    li.appendChild(p_name);
    li.appendChild(p_duration);
    li.appendChild(remaining);
    li.appendChild(created_time);
    project_list.appendChild(li);


}


db.collection('projects').orderBy('project_duration_to', 'desc').onSnapshot(snapshot => {
    snapshot.forEach(function (doc) {

        renderProjectList_ad(doc);
        renderProjectList_tech(doc);

    });

});
