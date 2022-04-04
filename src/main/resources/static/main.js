const baseURL = "http://localhost:8081/api";



function showBSModal(modalid, inputid) {
	let context = document.getElementById(modalid);
	var myModal = new bootstrap.Modal(context, {});
	var theValue = document.getElementById(inputid).value;
	context.querySelector(".modal-body").innerHTML = "Successfully Deleted User with ID: " + theValue;
	myModal.show();
};

function showTheBSModal(modalid, inputid) {
	let context = document.getElementById(modalid);
	var myModal = new bootstrap.Modal(context, {});
	context.querySelector(".modal-body").innerHTML = "Successfully Deleted User with ID: " + inputid;
	myModal.show();
};


function showTheBSConfirmationModal(modalid, data) {
	let context = document.getElementById(modalid);
	var myModal = new bootstrap.Modal(context, {});
	context.querySelector(".modal-body").innerHTML = `"You sure you want to delete This User ?. This is irrersible operation.!!"
	<div class="text-center"><p>ID: ${data.id}</p><p>NAME: ${data.name}</p><p>EMAIL: ${data.email}</p><p>ACTIVE? ${data.active}</p></div>`;
	myModal.show();
};

function htmlizeResponse(res) {
	return (
		`<div class="alert alert-secondary mt-2" role="alert"><pre>` +
		JSON.stringify(res, null, 2) +
		"</pre></div>"
	);
}

async function getAllData() {
	let resultElement = document.getElementById("getResult");
	resultElement.innerHTML = "";

	try {
		const res = await fetch(`${baseURL}/appUsers`);

		if (!res.ok) {
			const message = `An error has occured: ${res.status} - ${res.statusText}`;
			throw new Error(message);
		}

		const data = await res.json();

		const result = {
			status: res.status + "-" + res.statusText,
			headers: {
				"Content-Type": res.headers.get("Content-Type"),
				"Content-Length": res.headers.get("Content-Length"),
			},
			length: res.headers.get("Content-Length"),
			data: data,
		};

		resultElement.innerHTML = htmlizeResponse(result);
	} catch (err) {
		resultElement.innerHTML = htmlizeResponse(err.message);
	}


}


async function drawTableFromData() {
	let resultElement = document.getElementById("getResult");
	resultElement.innerHTML = "";

	try {
		const res = await fetch(`${baseURL}/appUsers`);

		if (!res.ok) {
			const message = `An error has occured: ${res.status} - ${res.statusText}`;
			throw new Error(message);
		}

		const data = await res.json();

		var col = [];
		for (var i = 0; i < data.length; i++) {
			for (var key in data[i]) {
				if (col.indexOf(key) === -1) {
					col.push(key);
				}
			}
		}
		// Create a table.
		var table = document.createElement("table");
		table.id = "myTable";

		table.className = "table table-bordered mt-4";

		// Create table header row using the extracted headers above.
		var tr = table.insertRow(-1);                   // table row.

		for (var i = 0; i < col.length; i++) {
			var th = document.createElement("th");      // table header.
			th.innerHTML = col[i].toUpperCase();
			tr.appendChild(th);
		}

		tr.insertCell(-1);

		table.rows[0].cells[col.length].innerHTML = 'Actions';
		table.rows[0].cells[col.length].style.fontWeight = "bold";

		// add json data to the table as rows.
		for (var i = 0; i < data.length; i++) {

			//alert(data[0].id);

			tr = table.insertRow(-1);

			for (var j = 0; j < col.length; j++) {
				var tabCell = tr.insertCell(-1);
				tabCell.innerHTML = data[i][col[j]];

			}

			var tabCell2 = tr.insertCell(-1);
			tabCell2.innerHTML = `<button class="btn btn-sm btn-primary" onclick="getDataByTheId(${data[i].id})">Edit</button>
			<button class="btn btn-sm btn-danger ml-5" onclick="getDataBySomeId(${data[i].id}, this)">Delete</button>`;

		}

		// Now, add the newly created table with json data, to a container.
		var divShowData = document.getElementById('showData');
		divShowData.innerHTML = "";
		divShowData.appendChild(table);

	} catch (err) {
		resultElement.innerHTML = htmlizeResponse(err.message);
	}


}


async function getDataByTheId(id) {
	//alert(id);
	let resultElement = document.getElementById("getResult");
	resultElement.innerHTML = "";
	clearDisplayOutput();


	//	const id = document.getElementById("get-id").value;

	if (id != "") {
		try {
			const res = await fetch(`${baseURL}/appUsers/${id}`);

			if (!res.ok) {
				alert("Data not found. Error Code:" + res.status);
				const message = `An error has occured: ${res.status} - ${res.statusText}`;
				throw new Error(message);
			}

			const data = await res.json();

			const result = {
				data: data,
				status: res.status,
				statusText: res.statusText,
				headers: {
					"Content-Type": res.headers.get("Content-Type"),
					"Content-Length": res.headers.get("Content-Length"),
				},
			};


			const displayid = document.getElementById("display-id");
			const displayname = document.getElementById("display-name");
			const displayemail = document.getElementById("display-email");
			const displayactive = document.getElementById("display-active");
			displayid.value = data.id;
			displayname.value = data.name;
			displayemail.value = data.email;
			data.active = true ? displayactive.checked = data.active : displayactive.checked = data.active;
			//displayactive.value = data.active;
			//			if(displayactive){
			//			displayactive.checked = true;
			//			} else {
			//				displayactive.checked = false;
			//			}


			resultElement.innerHTML = htmlizeResponse(result);
		} catch (err) {
			resultElement.innerHTML = htmlizeResponse(err.message);
		}
	}
}


async function getDataById() {
	let resultElement = document.getElementById("getResult");
	resultElement.innerHTML = "";
	clearDisplayOutput();

	const id = document.getElementById("get-id").value;

	if (id) {
		try {
			const res = await fetch(`${baseURL}/appUsers/${id}`);

			if (!res.ok) {
				alert("Data not found. Error Code:" + res.status);
				const message = `An error has occured: ${res.status} - ${res.statusText}`;
				throw new Error(message);
			}

			const data = await res.json();

			const result = {
				data: data,
				status: res.status,
				statusText: res.statusText,
				headers: {
					"Content-Type": res.headers.get("Content-Type"),
					"Content-Length": res.headers.get("Content-Length"),
				},
			};


			const displayid = document.getElementById("display-id");
			const displayname = document.getElementById("display-name");
			const displayemail = document.getElementById("display-email");
			const displayactive = document.getElementById("display-active");
			displayid.value = data.id;
			displayname.value = data.name;
			displayemail.value = data.email;
			data.active = true ? displayactive.checked = data.active : displayactive.checked = data.active;
			//displayactive.value = data.active;
			//			if(displayactive){
			//			displayactive.checked = true;
			//			} else {
			//				displayactive.checked = false;
			//			}


			resultElement.innerHTML = htmlizeResponse(result);
		} catch (err) {
			resultElement.innerHTML = htmlizeResponse(err.message);
		}
	}
}




async function getDataByName() {
	let resultElement = document.getElementById("getResult");
	resultElement.innerHTML = "";

	const name = document.getElementById("get-name").value;

	if (name) {
		try {
			// const res = await fetch(`${baseURL}/appUsers?title=${title}`);

			let url = new URL(`${baseURL}/appUsers`);
			const params = { name: name };
			url.search = new URLSearchParams(params);

			const res = await fetch(url);

			if (!res.ok) {
				const message = `An error has occured: ${res.status} - ${res.statusText}`;
				throw new Error(message);
			}

			const data = await res.json();

			const result = {
				status: res.status + "-" + res.statusText,
				headers: {
					"Content-Type": res.headers.get("Content-Type"),
					"Content-Length": res.headers.get("Content-Length"),
				},
				data: data,
			};

			resultElement.innerHTML = htmlizeResponse(result);
		} catch (err) {
			resultElement.innerHTML = htmlizeResponse(err.message);
		}
	}
}


async function getDataByActive() {
	let resultElement = document.getElementById("getActiveResult");
	resultElement.innerHTML = "";

	try {
		// const res = await fetch(`${baseURL}/appUsers?title=${title}`);

		let url = new URL(`${baseURL}/appUsers/active`);

		const res = await fetch(url);

		if (!res.ok) {
			const message = `An error has occured: ${res.status} - ${res.statusText}`;
			throw new Error(message);
		}

		const data = await res.json();

		const result = {
			status: res.status + "-" + res.statusText,
			headers: {
				"Content-Type": res.headers.get("Content-Type"),
				"Content-Length": res.headers.get("Content-Length"),
			},
			data: data,
		};

		resultElement.innerHTML = htmlizeResponse(result);
	} catch (err) {
		resultElement.innerHTML = htmlizeResponse(err.message);
	}

}

async function postData() {
	let resultElement = document.getElementById("postResult");
	resultElement.innerHTML = "";

	const name = document.getElementById("post-name").value;
	const email = document.getElementById("post-email").value;
	const active = document.getElementById("post-active").checked;

	const postData = {
		name: name,
		email: email,
		active: active,
	};

	try {
		const res = await fetch(`${baseURL}/appUsers`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": "token-value",
			},
			body: JSON.stringify(postData),
		});

		if (!res.ok) {
			const message = `An error has occured: ${res.status} - ${res.statusText}`;
			throw new Error(message);
		}

		const data = await res.json();

		const result = {
			status: res.status + "-" + res.statusText,
			headers: {
				"Content-Type": res.headers.get("Content-Type"),
				"Content-Length": res.headers.get("Content-Length"),
			},
			data: data,
		};

		resultElement.innerHTML = htmlizeResponse(result);
	} catch (err) {
		resultElement.innerHTML = htmlizeResponse(err.message);
	}
}

async function putData() {
	let resultElement = document.getElementById("putResult");
	resultElement.innerHTML = "";

	const id = document.getElementById("put-id").value;
	const name = document.getElementById("put-name").value;
	const email = document.getElementById("put-email").value;
	const active = document.getElementById("put-active").checked;

	const putData = {
		name: name,
		email: email,
		active: active,
	};

	try {
		const res = await fetch(`${baseURL}/appUsers/${id}`, {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": "token-value",
			},
			body: JSON.stringify(putData),
		});

		if (!res.ok) {
			const message = `An error has occured: ${res.status} - ${res.statusText}`;
			throw new Error(message);
		}

		const data = await res.json();

		const result = {
			status: res.status + "-" + res.statusText,
			headers: { "Content-Type": res.headers.get("Content-Type") },
			data: data,
		};

		resultElement.innerHTML = htmlizeResponse(result);
	} catch (err) {
		resultElement.innerHTML = htmlizeResponse(err.message);
	}
}


async function putDisplayedData() {
	let resultElement = document.getElementById("displayResult");
	resultElement.innerHTML = "";

	const id = document.getElementById("display-id").value;
	const name = document.getElementById("display-name").value;
	const email = document.getElementById("display-email").value;
	const active = document.getElementById("display-active").checked;

	const putData = {
		name: name,
		email: email,
		active: active,
	};

	try {
		const res = await fetch(`${baseURL}/appUsers/${id}`, {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": "token-value",
			},
			body: JSON.stringify(putData),
		});

		if (!res.ok) {
			const message = `An error has occured: ${res.status} - ${res.statusText}`;
			throw new Error(message);
		}

		const data = await res.json();

		const result = {
			status: res.status + "-" + res.statusText,
			headers: { "Content-Type": res.headers.get("Content-Type") },
			data: data,
		};

		resultElement.innerHTML = htmlizeResponse(result);
	} catch (err) {
		resultElement.innerHTML = htmlizeResponse(err.message);
	}
}

async function deleteAllData() {
	let resultElement = document.getElementById("deleteResult");
	resultElement.innerHTML = "";

	try {
		const res = await fetch(`${baseURL}/appUsers`, { method: "delete" });

		//const data = await res.json();

		if (res.status == 204) {
			alert("Deleted all users Successfully !");
		} else {
			alert("Delete Failed !" + " ErrorCode: " + res.status);
		}

		const result = {
			status: res.status + "-" + res.statusText,
			headers: { "Content-Type": res.headers.get("Content-Type") },

		};

		resultElement.innerHTML = htmlizeResponse(result);
	} catch (err) {
		resultElement.innerHTML = htmlizeResponse(err.message);
	}
}



async function deleteDataByTheId(id, obj) {
	let resultElement = document.getElementById("deleteResult");
	resultElement.innerHTML = "";


	// get and display data for user before deletion
	const fetchUserFirst = await fetch(`${baseURL}/appUsers/${id}`);

	if (!fetchUserFirst.ok) {
		alert("Data not found. Error Code:" + fetchUserFirst.status);
		const message = `An error has occured: ${fetchUserFirst.status} - ${fetchUserFirst.statusText}`;
		throw new Error(message);
	}


	const data = await fetchUserFirst.json();
	showTheBSConfirmationModal('confirmmationModal', data);




	try {
		const res = await fetch(`${baseURL}/appUsers/${id}`, { method: "delete" });

		if (res.status == 204) {
			//alert("Delete Successful !");
			showTheBSModal('exampleModal', id);
		} else {
			alert("Delete Failed !" + " ErrorCode: " + res.status);
		}

		const result = {
			status: res.status + "-" + res.statusText,
			headers: { "Content-Type": res.headers.get("Content-Type") },
		};



		//no clue what to put here?
		var p = obj.parentNode.parentNode;
		p.parentNode.removeChild(p);


		resultElement.innerHTML = htmlizeResponse(result);
	} catch (err) {
		resultElement.innerHTML = htmlizeResponse(err.message);
	}
}


async function getDataBySomeId(id, obj) {

	if (id) {
		try {
			const res = await fetch(`${baseURL}/appUsers/${id}`);
			const data = await res.json();
			var htmlString = `ID: ${data.id}<br>Name: ${data.name}<br>Email: ${data.email} <br>IsActive? ${data.active}`;



			Swal.fire({
				//didOpen() {
				//alert('ye lo bhai...');
				//},
				titleText: 'You sure to delete this user? ',
				showDenyButton: true,
				//showCancelButton: true,
				confirmButtonText: 'Yes',
				confirmButtonColor: 'green',
				denyButtonText: 'No',
				denyButtonColor: 'gray',
				customClass: {
					actions: 'my-actions',
					confirmButton: 'order-1',
					denyButton: 'order-2 right-gap',
					//cancelButton: 'order-3',
				},
				html: htmlString,
				focusDeny: true,
			}).then((result) => {
				if (result.isConfirmed) {
					fetch(`${baseURL}/appUsers/${id}`, { method: "delete" });
					var p = obj.parentNode.parentNode;
					p.parentNode.removeChild(p);
					Swal.fire('Deleted Successfully !!', '', 'success');
				} else if (result.isDenied) {
					Swal.fire('Changes are not saved', '', 'info')
				}
			})



		} catch (err) {
			alert(err.message);
		}
	}
}



async function deleteDataById() {
	let resultElement = document.getElementById("deleteResult");
	resultElement.innerHTML = "";

	const id = document.getElementById("delete-id").value;

	if (id) {
		try {
			const res = await fetch(`${baseURL}/appUsers/${id}`, { method: "delete" });

			if (res.status == 204) {
				alert("Delete Successful !");
				showBSModal('exampleModal', 'delete-id');
			} else {
				alert("Delete Failed !" + " ErrorCode: " + res.status);
			}

			const result = {
				status: res.status + "-" + res.statusText,
				headers: { "Content-Type": res.headers.get("Content-Type") },
			};


			resultElement.innerHTML = htmlizeResponse(result);
		} catch (err) {
			resultElement.innerHTML = htmlizeResponse(err.message);
		}
	} else {
		alert("ID can not be null");
	}
}

function clearGetOutput() {
	document.getElementById("getResult").innerHTML = "";
}

function clearDisplayOutput() {
	document.getElementById("displayResult").innerHTML = "";
}

function clearTableArea() {
	document.getElementById("showData").innerHTML = "";
}

function clearGetActiveOutput() {
	document.getElementById("getActiveResult").innerHTML = "";
}

function clearPostOutput() {
	document.getElementById("postResult").innerHTML = "";
}

function clearPutOutput() {
	document.getElementById("putResult").innerHTML = "";
}

function clearDeleteOutput() {
	document.getElementById("deleteResult").innerHTML = "";
}