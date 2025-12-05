const usersURL = "http://127.0.0.1:5500/index.html";
const postsURL = "http://127.0.0.1:5500/index.html";


document.getElementById("userForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    let user = {
        userName: username.value.trim(),
        age: age.value.trim(),
        email: email.value.trim(),
        password: password.value.trim()
    };

    if (!user.userName || !user.age || !user.email || !user.password) {
        Swal.fire("Xəta!", "Heç bir xana boş ola bilməz!", "error");
        return;
    }

    if (user.age < 12) {
        Swal.fire("Xəta!", "İstifadəçinin yaşı 12-dən kiçik ola bilməz!", "warning");
        return;
    }

    await fetch(usersURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    Swal.fire("Uğurlu!", "User əlavə olundu!", "success");
    getUsers();
});



async function getUsers() {
    let res = await fetch(usersURL);
    let data = await res.json();

    usersList.innerHTML = data.map(u => `
        <div class="card">
            <h3>${u.userName}</h3>
            <p>Age: ${u.age}</p>
            <p>Email: ${u.email}</p>
        </div>
    `).join("");
}

getUsers();



document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    let post = {
        title: title.value.trim(),
        description: description.value.trim(),
        image: image.value.trim()
    };

    if (!post.title || !post.description || !post.image) {
        Swal.fire("Xəta!", "Post inputları boş ola bilməz!", "error");
        return;
    }

    await fetch(postsURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
    });

    Swal.fire("Uğurlu!", "Post əlavə olundu!", "success");
    getPosts();
});



async function getPosts() {
    let res = await fetch(postsURL);
    let data = await res.json();

    postsList.innerHTML = data.map(p => `
        <div class="card">
            <img src="${p.image}" alt="">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
        </div>
    `).join("");
}

getPosts();
