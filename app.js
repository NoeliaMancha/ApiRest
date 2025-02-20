document.getElementById('loadPostsBtn').addEventListener('click', function() {
    const numeroUsuario = document.getElementById('numeroUsuario').value;
    const postsContainer = document.getElementById('posts');
    const messageContainer = document.createElement('div');  // Contenedor para los mensajes

    // Limpiar el contenedor de posts antes de cargar nuevos posts
    postsContainer.innerHTML = '';

    // Validar el número ingresado
    if (numeroUsuario < 1 || numeroUsuario > 10) {
        alert('Por favor, elige un número del 1 al 10.');
        return;
    }

    // Crear y mostrar el encabezado con el número elegido
    const header = document.createElement('h1');
    header.textContent = `El número que has elegido es: ${numeroUsuario}`;
    messageContainer.appendChild(header);

    // Agregar el contenedor de mensajes al contenedor principal
    postsContainer.appendChild(messageContainer);

    // Hacer la solicitud a JSONPlaceholder para obtener todos los posts
    fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(response => response.json())
        .then(posts => {
            // filter para filtrar los posts por el userId en función del número ingresado por el usuario
            // parseInt(numeroUsuario) para convertir el número del input a un entero
            const filteredPosts = posts.filter(post => post.userId === parseInt(numeroUsuario));
            
            //Si el filtro de los post es mayor a 0
            if (filteredPosts.length > 0) {
                // Mostrar todos los posts que coinciden con el userId
                filteredPosts.forEach(post => {
                    //se crea un div por cada post
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');
                    //se le añade un titulo y un párrafo
                    postElement.innerHTML = `
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                    `;
                    // Agregar el post al contenedor
                    postsContainer.appendChild(postElement);
                });
            } else {
                alert('No se encontraron posts para el userId ingresado.');
            }
        })
        .catch(error => {
            console.error('Error al cargar los posts:', error);
        });

    // Añadir estilo para asegurarse de que los posts no tapen el contenido superior
    postsContainer.style.marginTop = "20px";  // Espacio entre los posts y el encabezado
});
