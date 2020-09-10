
	function renderClientList(doc){
		var select = document.getElementsByName('client_select')[0];
		let option = document.createElement('option');
		var name = document.createTextNode(doc.data().name);

		option.setAttribute("value",doc.data().name);

		option.appendChild(name);
		select.insertBefore(option,select.lastChild);

	}


	function renderClientList_add(doc){
		var select = document.getElementsByName('client_select')[1];
		let option = document.createElement('option');
		var name = document.createTextNode(doc.data().name);

		option.setAttribute("value",doc.data().name);

		option.appendChild(name);
		select.insertBefore(option,select.lastChild);

	}

	db.collection("client_list").get().then(function(querySnapshot)
	{
		querySnapshot.forEach(function(doc)
		{

			
			renderClientList(doc);
			renderClientList_add(doc);

		});

	});




// function onChangeProject(){



// 	const form = document.querySelector('#post_form');
// 	var c_name = form.client_select.value;
	
// 	function renderProjectList(doc){
// 		var select = document.getElementsByName('project_select')[0];
// 		let option = document.createElement('option');
// 		var name = document.createTextNode(doc.data().project_name);

// 		option.setAttribute("value",doc.data().project_name);

// 		option.appendChild(name);
// 		select.insertBefore(option,select.lastChild);

// 	}


// 	db.collection("projects").where('client_name', '==', c_name).onSnapshot(snapshot=>
// 	{
// 		snapshot.forEach(function(doc)
// 		{

// 			renderProjectList(doc);

// 		});

// 	});
// }








