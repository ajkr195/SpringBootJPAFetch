const baseURL = "http://localhost:8080/api";

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

async function getDataById() {
	let resultElement = document.getElementById("getResult");
	resultElement.innerHTML = "";

	const id = document.getElementById("get-id").value;

	if (id) {
		try {
			const res = await fetch(`${baseURL}/appUsers/${id}`);

			if (!res.ok) {
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

async function deleteAllData() {
	let resultElement = document.getElementById("deleteResult");
	resultElement.innerHTML = "";

	try {
		const res = await fetch(`${baseURL}/appUsers`, { method: "delete" });

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

async function deleteDataById() {
	let resultElement = document.getElementById("deleteResult");
	resultElement.innerHTML = "";

	const id = document.getElementById("delete-id").value;

	try {
		const res = await fetch(`${baseURL}/appUsers/${id}`, { method: "delete" });

		const data = await res.json();
		
		alert (data);

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

function clearGetOutput() {
	document.getElementById("getResult").innerHTML = "";
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