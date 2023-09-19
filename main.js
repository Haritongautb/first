$(document).ready(function () {
    const optionsProblemsData = [
        { value: "", content: "Wybierz rodzaj problemu", selected: true, disabled: true, },
        { value: "menu-form-problems-1", content: "menu-form-problems-1" },
        { value: "menu-form-problems-2", content: "menu-form-problems-2" },
        { value: "menu-form-problems-3", content: "menu-form-problems-3" },
    ]
    const optionsQuestionsData = [
        { value: "", content: "Wybierz pytanie", selected: true, disabled: true, },
        { value: "menu-form-questions-1", content: "menu-form-questions-1" },
        { value: "Mojego problemu nie ma na liście", content: "Mojego problemu nie ma na liście" },
        { value: "menu-form-questions-2", content: "menu-form-questions-2" },
        { value: "menu-form-questions-3", content: "menu-form-questions-3" },
    ]
    const menuFormProblemsSelect = $("#menu-form-problems"),
        menuFormQuestionsSelect = $("#menu-form-questions"),
        menuForm = $("#menu-form-block"),
        extraFormMenu = $("#extra-form-menu"),
        menuFormTheme = $("#menu-form-theme"),
        menuFormComment = $("#menu-form-textarea"),
        menuFormButton = $("#menu-form-button"),
        _BASEAPI = "http://localhost:3000/forms";


    menuFormQuestionsSelect.hide();
    extraFormMenu.hide();

    function renderOptions(data, elem) {
        $.each(data, function (index, item) {
            const optionElement = $("<option>")
                .attr("value", item.value)
                .text(item.content);

            if (item.selected) {
                optionElement.attr("selected", true);
            }

            if (item.disabled) {
                optionElement.attr("disabled", true);
            }

            elem.append(optionElement);
        })
    }

    renderOptions(optionsProblemsData, menuFormProblemsSelect);
    renderOptions(optionsQuestionsData, menuFormQuestionsSelect);

    function bindInput(element) {
        return element.on("change", function (event) {
            const problemsVal = menuFormProblemsSelect.val();
            const questionsVal = menuFormQuestionsSelect.val();
            if (problemsVal) {
                menuFormQuestionsSelect.fadeIn(1000);
            }
            if (questionsVal === "Mojego problemu nie ma na liście") {
                extraFormMenu.fadeIn(1000);
            } else {
                extraFormMenu.fadeOut(1000);
            }
            return problemsVal && questionsVal ? menuFormButton.attr("disabled", false) : menuFormButton.attr("disabled", true);
        })
    }

    bindInput(menuFormProblemsSelect);
    bindInput(menuFormQuestionsSelect);
    bindInput(menuFormTheme);
    bindInput(menuFormComment);

    async function request(event) {
        try {
            menuFormButton.attr("disabled", true)
            event.preventDefault();
            const formData = new FormData(event.target);
            const fields = Object.fromEntries(formData);

            const response = await fetch(_BASEAPI, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fields)
            })

            if (!result.ok) {
                throw new Error(result.message)
            }
            const result = await response.json();
            console.log(result)
        } catch (e) {
            return e;
        } finally {
            event.target.reset();
            menuFormButton.attr("disabled", false)
        }
    }

    menuForm.submit(request);

})


