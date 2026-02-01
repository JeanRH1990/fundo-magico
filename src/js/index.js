document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-group");
    const descriptionInput = document.querySelector("#description");
    const codigoHtml = document.getElementById("html-code");
    const codigoCss = document.getElementById("css-code");
    const sectionPreview = document.getElementById("preview-section");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const description = descriptionInput.value.trim();

        if (!description) {
            return;
        }

        viewLoader(true);

        try {
            const response = await fetch("https://jeanrh.app.n8n.cloud/webhook/fundo-magico", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ description }),
            });

            const data = await response.json();
            codigoHtml.textContent = data.html || "";
            codigoCss.textContent = data.css || "";

            sectionPreview.style.display = "block";
            sectionPreview.innerHTML = data.html || "";

            let tagStyle = document.getElementById("style-dinamic");
            if (tagStyle) {
                tagStyle.remove();
            }
            if (data.css) {
                tagStyle = document.createElement("style");
                tagStyle.id = "style-dinamic";
                tagStyle.textContent = data.css;
                document.head.appendChild(tagStyle);
            }
        } catch (error) {
            console.error(error);
            codigoHtml.textContent = "Não conseguimos gerar o código HTML, tente novamente.";
            codigoCss.textContent = "Não conseguimos gerar o código CSS, tente novamente.";
            sectionPreview.innerHTML = "";
        } finally {
            viewLoader(false);
        }

    });
});

function viewLoader(isLoading) {
    const buttonSend = document.getElementById("generate-btn");
    if (isLoading) {
        buttonSend.textContent = "Carregando Background...";
    } else {
        buttonSend.textContent = "Gerar Background Mágico";
    }
}