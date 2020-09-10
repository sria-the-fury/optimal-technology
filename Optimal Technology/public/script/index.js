const login = document.querySelector('#log_in');
const adminContentList = document.querySelector('.admin');
const userContentList = document.querySelector('.technician');

const userDetails = document.querySelectorAll('.sidebar-header');



const setupUI = (user) => {
    var div_pass_value ='';
    if (user) {
        if (user.admin) {
            div_pass_value = "update_pass";

            userContentList.style.display = 'none';
            login.style.display = 'none';

            adminContentList.style.display = 'block';


        }
        else {
            div_pass_value = "update_pass_tech";
            login.style.display = 'none';
            userContentList.style.display = 'block';
            adminContentList.style.display = 'none';

        }



        
            const html = `
            <div style="padding-left:2%;">
            <span style ="font-weight:bold; color:black;background-color:#e5e9f0;border-radius:10px; padding-left:3%;padding-right:3%;">${user.displayName == null ? 'Name Here' : ''}${user.displayName} </span><br>
            <span style="background-color:#96f2d7;padding-left:3%;padding-right:3%;border-radius:10px;color:#228be6;"> <small>${user.admin ? 'Admin' : 'Technician'}</small></span>
            
            <div><small>${user.email} <br>Verified : ${user.emailVerified}</small></div>
            <span onclick="divVisibility('${user.admin ? 'set_name':'set_name_tech'}');" style="background-color:#1164B4;padding-left:3%;padding-right:3%;border-radius:10px;color:white;"> <small>${user.displayName == null ? 'Set Name' :'update name'}</small></span>
            
            <span onclick="divVisibility('${div_pass_value}');" style="background-color:#9B2335;padding-left:3%;padding-right:3%;border-radius:10px;color:white;margin-left:4%;"> <small>change password</small></span>
            </div>
        `;
            userDetails.forEach(item => item.innerHTML = html);


        if (user.emailVerified === false) {

            document.querySelector('#verify_tech').addEventListener("click", ClickVerification);
            document.querySelector('#verify_admin').addEventListener("click", ClickVerification_admin);
            function ClickVerification() {
                var user = firebase.auth().currentUser;

                user.sendEmailVerification().then(function () {
                   
                    window.alert("Verification Sent");
                }).catch(function (error) {
                    window.alert("Error : " + error.message);
                });
            };

            function ClickVerification_admin() {
                var user = firebase.auth().currentUser;

                user.sendEmailVerification().then(function () {
                    window.alert("Verification Sent");
                }).catch(function (error) {
                    window.alert("Error : " + error.message);
                });
            };

        }
        else {
            var user = firebase.auth().currentUser;
            document.querySelector('#verify_tech').style.display = 'none';
            document.querySelector('#verify_admin').style.display = 'none';

        }

    }



    else {
        login.style.display = 'block';
        adminContentList.style.display = 'none';
        userContentList.style.display = 'none';

    }
};



        








const eod_list = document.querySelector('.eod_list');
const setupEODList = (data) => {

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            var eod = doc.data();

            const li = `
        <li>
          <div class="collapsible-header lighten-4">
          <div style="font-size:16px;">${eod.project_name}</div>
          <div style="font-size:11px;">EOD Date : ${eod.eod_date}</div>
          
          <div style="font-size:11px;">EOD Given by : ${eod.team_lead} ( ${eod.mobile_number} )</div>
          <div style="font-size:8px; color: #ff8787;">created at : ${eod.created_at}</div>
          </div>

          <div class="collapsible-body white-area"><small>
          <span> **প্রতি মাসের ৩০ তারিখের মধ্যে Project এর খরচের বিল পরিশোধ না করলে, আপনার বেতন স্থগিত রাখা হবে? → </span><span style="color:#12b886;">${eod.hold_salary} </span>
          <div class="line" style="margin:0;"></div>

          <span> ১. Department এর নাম  → </span><span style="color:#12b886;">${eod.dept_name} </span>
          <div class="line" style="margin:0;"></div>

          <span> ২. এই প্রজেক্টে যারা কাজ করছে, তাদের নাম  → </span><span style="color:#12b886;">${eod.technicians_name} </span>
          <div class="line" style="margin:0;"></div>

          <span> ৩. আজকের দিনের কাজের বর্ণনা → </span><span style="color:#12b886;">${eod.work_description} </span>
          <div class="line" style="margin:0;"></div>

          <span> ৪. এই প্রজেক্টের জন্য Man Day ধরা হয়েছিল → </span><span style="color:#12b886;">${eod.man_day} জন</span>
          <div class="line" style="margin:0;"></div>

          <span> ৫. এই প্রকল্পে আমি কাজ করছি → </span><span style="color:#12b886;">${eod.days_of_working} day(s) </span>
          <div class="line" style="margin:0;"></div>

          <span> ৬. এই প্রকল্পের কাজ শেষ হতে আর দিন লাগবে → </span><span style="color:#12b886;">${eod.days_need} day(s) </span>
          <div class="line" style="margin:0;"></div>

          <span> ৭. এই প্রকল্পে কাজ করতে অসুবিধা হচ্ছে → </span><span style="color:#12b886;">${eod.problem_description} </span>




          </small>
          </div>
          </li>

        `;

            html += li

        });
        eod_list.innerHTML = html


    }
};


//requisition_list

const M_R_list = document.querySelector('.req_list');

const setupMRList = (data) => {

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            var mr = doc.data();

            const li = `

        <li>
          <div class="collapsible-header grey lighten-4"><div style="font-size:16px;">${mr.project_name}</div>
          <div style="font-size:12px;">MR Given by : ${mr.team_leader} ( ${mr.mobile_number} )</div>
          <div style="font-size:11px; color: #ff8787;">Money Need : ${mr.money_need}TK.</div>
          
          <div style="font-size:8px;">created at : ${mr.created_at}</div></div>
          <div class="collapsible-body white"><small>
          <span> ** প্রতিদিন EOD জমা দিচ্ছেন? → </span> <span style="color:#12b886;">${mr.EOD_given} </span>

         <div class="line" style="margin:0;"></div>
        <span> ***প্রতি মাসের ৩০ তারিখের মধ্যে প্রজেক্টের খরচের বিল পরিশোধ না করলে, আপনার বেতন স্থগিত রাখা হবে? → </span><span style="color:#12b886;">${mr.hold_salary} </span>

        <div class="line" style="margin:0;"></div>
        <span> ১. মোট Technicians কাজ করছে →  <span><span style="color:#12b886;"> ${mr.technician_no} জন</span>

        <div class="line" style="margin:0;"></div>
        <span> ২. তাদের (Technicians) নামগুলো → <span><span style="color:#12b886;">${mr.technicians_name} </span>

        <div class="line" style="margin:0;"></div>
        <span> ৩. এই প্রজেক্টের জন্য প্রতিদিনের মোট টাকা লাগে → <span><span style="color:#12b886;">${mr.daily_cost}TK. </span>

        <div class="line" style="margin:0;"></div>
        <span> ৪. এই প্রজেক্টের কাজ শেষ হতে আর দিন লাগতে পারে → <span><span style="color:#12b886;">${mr.days_remaining} day(s) </span>

        <div class="line" style="margin:0;"></div>
        <span> ৫. এই প্রজেক্টের জন্য এ পর্যন্ত মোট টাকা অফিস থেকে নিয়েছি → <span><span style="color:#12b886;">${mr.money_taken}TK. </span>

        <div class="line" style="margin:0;"></div>
        <span> ৬. এই প্রজেক্টের জন্য মালামাল ক্রয় করতে হবে → <span><span style="color:#12b886;">${mr.project_goods} </span>

        <div class="line" style="margin:0;"></div>
        <span> ৭. এই প্রজেক্টের খরচের বিল অফিসে জমা দিয়েছেন → <span><span style="color:#12b886;">${mr.Bill_given} </span>

        <div class="line" style="margin:0;"></div>
        <span> ** আপনার যে কোন ধরনের মতামত থাকলে জানান → <span><span style="color:#12b886;">${mr.problem_description} </span>

        </small></div>
        </li>
        
        `;
            html += li

        });
        M_R_list.innerHTML = html;

    }
};



// post list

const post_list_show = document.querySelectorAll('#post_list');

const setupPostList = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            var post = doc.data();
            const li = `
            
            <li>
            <span> ${post.project_name} ( ${post.client_name} )</span>
            <span>Work Date : ${post.date_of_work} </span>
            <span>Technicians' name : </span>
            <span>${post.technicians_name} </span>
            <span>Leader : ${post.lead_technician} </span>
            <span>Posted at : ${post.created_at} </span>
            </li>
            `;
            html += li
        });
        post_list_show.forEach(item => item.innerHTML = html);
    }
};


//technician list

const tech_list = document.querySelectorAll('#tech_list');
const total_list = document.querySelectorAll('#total_tech');

const setupTechList = (data) => {
    if (data.length) {
        let html = '';
        let list ='';
        data.forEach(doc => {
            var tech = doc.data();
            
            list="Total Technician : "+data.length;
           
            const li = `

            <li>
            <span> <b>Name : </b>${tech.name}</span>
            <span>Cell No. : </b>${tech.cell_no}</span>
            </li>

            `;
            html += li

        });
        tech_list.forEach(item => item.innerHTML = html);
        total_list.forEach(item => item.innerHTML= list);


    }
};


