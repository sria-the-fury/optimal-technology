
function renderProjectList(doc){
	var select = document.getElementsByName('project_select')[0];
	let option = document.createElement('option');
	var name = document.createTextNode(doc.data().project_name);

	option.setAttribute("value",doc.data().project_name);

	option.appendChild(name);
	select.insertBefore(option,select.lastChild);

}

function renderProjectList_req(doc){
	var select = document.getElementsByName('project_select')[1];
	let option = document.createElement('option');
	var name = document.createTextNode(doc.data().project_name);

	option.setAttribute("value",doc.data().project_name);

	option.appendChild(name);
	select.insertBefore(option,select.lastChild);

}

function renderProjectList_post(doc){
	var select = document.getElementsByName('project_select')[2];
	let option = document.createElement('option');
	var name = document.createTextNode(doc.data().project_name);

	option.setAttribute("value",doc.data().project_name);

	option.appendChild(name);
	select.insertBefore(option,select.lastChild);

}

db.collection("projects").get().then(function(querySnapshot)
	{
		querySnapshot.forEach(function(doc)
		{

			renderProjectList(doc);
			renderProjectList_req(doc);
			renderProjectList_post(doc);

		});

	});
