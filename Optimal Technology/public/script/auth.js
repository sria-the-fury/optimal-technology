// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    
    auth.signInWithEmailAndPassword(email, password).then((cred) => {


        loginForm.reset();

    }).catch(function(error){
        document.querySelector('#match').style.display = 'block';
        document.querySelector('#match').addEventListener("click", forgetPassword);
        function forgetPassword(){
            if (email != "") {
                auth.sendPasswordResetEmail(email).then(function(){
                   
                    window.alert("Email has been sent please check.")

                }).catch(function(error){

                    window.alert("Message : "+errorMessage);
                });
                
            }
        };
    });

});

//user_status

auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            
            setupUI(user);
        });
        db.collection('eod').orderBy('eod_date', 'desc').onSnapshot(snapshot => {
            setupEODList(snapshot.docs);

        });

        db.collection('money_requisition').orderBy('created_at', 'desc').onSnapshot(snapshot => {
            setupMRList(snapshot.docs);

        });

        db.collection('post_schedule_time').orderBy('date_of_work', 'desc').onSnapshot(snapshot => {
            setupPostList(snapshot.docs);
        });

        db.collection("technician").orderBy('name', 'asc').onSnapshot(snapshot => {
            setupTechList(snapshot.docs);
        });

    }
    else {
        setupUI();
        setupEODList([]);
        setupMRList([]);
        setupPostList([]);
        setupTechList([]);
    }
});


// logout
const logout = document.querySelectorAll('#logout');
logout.forEach(item => item.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    location.reload();

}));


//add admin 

const adminForm = document.querySelector('#admin-add-email');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email: adminEmail }).then(result => {
       
        adminForm.reset();


    });


});


//eod post

const eod_form = document.querySelector('#eod_form_add');

eod_form.addEventListener('submit', (e) => {
    e.preventDefault();
    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

    var created_time = d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear() + " → " + date;
    var created_time_string = created_time.toString();
    db.collection("eod").add({
        hold_salary: eod_form.radio_hold.value,
        dept_name: eod_form.radio_team.value,
        eod_date: eod_form.eod_for_date.value,
        project_name: eod_form.project_select.value,
        team_lead: eod_form.project_team_leader.value,
        technicians_name: eod_form.techs_name.value,
        work_description: eod_form.work_description.value,
        man_day: eod_form.man_day.value,
        days_of_working: eod_form.how_days_work.value,
        days_need: eod_form.days_need.value,
        mobile_number: eod_form.mobile_no.value,
        problem_decription: eod_form.desc_problems.value,
        created_at: created_time_string
    }).then(() => {
        eod_form.reset();

    });


});


//money_requisition_add
const form_req = document.querySelector('#money_req_form');

form_req.addEventListener('submit', (e) => {
    e.preventDefault();
    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

    var created_time = d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear() + " → " + date;
    var created_time_string = created_time.toString();

    db.collection("money_requisition").add({
        EOD_given: form_req.radio_eod.value,
        hold_salary: form_req.radio_hold.value,
        project_name: form_req.project_select.value,
        team_leader: form_req.team_leader.value,
        technician_no: form_req.techs_no.value,
        technicians_name: form_req.techs_name.value,
        daily_cost: form_req.money_amount.value,
        days_remaining: form_req.days_need.value,
        money_taken: form_req.money_amounttaken.value,
        project_goods: form_req.goods_need.value,
        money_need: form_req.money_amount_need.value,
        Bill_given: form_req.when_bill.value,
        mobile_number: form_req.mobile_no.value,
        problem_decription: form_req.desc_problems.value, 
        created_at: created_time_string
}).then(()=>{
    form_req.reset();
});


});





const form_add_project = document.querySelector('#add_project_form');
var d = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var date = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

var created_time = d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear()+" → "+date;
var created_time_string = created_time.toString();

//saving data

form_add_project.addEventListener('submit', (e) => {
	e.preventDefault();
	
	db.collection("projects").add({
		client_name: form_add_project.client_select.value,
		project_name: form_add_project.project_name.value,
		project_location: form_add_project.project_location.value,
		project_duration_to: form_add_project.project_duration_to.value,
		project_duration_from: form_add_project.project_duration_from.value,
		created_at: created_time_string
	}).then(()=>{
        form_add_project.reset();
    });
	
	

});

 /*saving post*/
 const form_post = document.querySelector('#post_form');
 form_post.addEventListener('submit', (e) => {
     e.preventDefault();
     
     db.collection("post_schedule_time").add({
         client_name: form_post.client_select.value,
         project_name: form_post.project_select.value,
         technicians_name: form_post.techs_name.value,
         lead_technician: form_post.tech_leader_name.value,
         date_of_work: form_post.date_of_work.value,
         created_at: created_time_string
     }).then(()=>{
         form_post.reset();
     });
     
     
 
 });


 const pass_update = document.querySelectorAll('#password_update_form');

 pass_update.forEach(item => item .addEventListener('submit', (e) => {
     e.preventDefault();
    var newPassword = document.querySelector('#updatePass').value;
    var user = firebase.auth().currentUser;
    user.updatePassword(newPassword).then(function() {
       
        
        window.alert("Password Updated");
        pass_update.forEach(item => item.reset());
      }).catch(function(error) {
        // An error happened.
        console.log(error);
        window.alert("Re Login Again or reset password");
 
      });



 }));

 const pass_update_form = document.querySelectorAll('#password_update_form_tech');

 pass_update_form.forEach(item => item .addEventListener('submit', (e) => {
     e.preventDefault();
    var newPassword = document.querySelector('#updatePassTech').value;
    var user = firebase.auth().currentUser;
    user.updatePassword(newPassword).then(function() {
        
        
        window.alert("Password Updated");
        pass_update_form.forEach(item => item.reset());
      }).catch(function(error) {
        // An error happened.
        console.log(error);
        window.alert("Re Login Again or reset password");
 
      });



 }));


 const set_name_form = document.querySelector('#set_form');
 set_name_form.addEventListener('submit',(e)=>{
     e.preventDefault();
     var profile_name = document.querySelector('#setName').value;
    
 
     var user = firebase.auth().currentUser;
     user.updateProfile({
        displayName: profile_name,
      }).then(function() {
        window.alert("Name Updated");
        set_name_form.reset();
      }).catch(function(error) {
        // An error happened.
      });

 });


 const set_name_form_tech = document.querySelector('#set_form_tech');
 set_name_form_tech.addEventListener('submit',(e)=>{
     e.preventDefault();
     var profile_name = document.querySelector('#setNameTech').value;
     
   
     var user = firebase.auth().currentUser;
     user.updateProfile({
        displayName: profile_name
       
      }).then(function() {
        window.alert("Name Updated");
        set_name_form_tech.reset();
      }).catch(function(error) {
        // An error happened.
      });



 });


 






