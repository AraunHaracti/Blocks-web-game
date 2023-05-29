let tableSize = { x: 5, y: 5 }

        let boxModel = document.createElement('div');
        boxModel.className = 'box';
        boxModel.style.backgroundColor = document.body
            .querySelector("[data-type='element-color']").value;

        document.body.querySelector("[data-type='element-color']")
            .addEventListener('change', (event) =>
                boxModel.style.backgroundColor = event.target.value
            );

        document.body.querySelector("[data-type='background-color']")
            .addEventListener('change', (event) =>
                boxModel.parentElement.style.backgroundColor = event.target.value
            );


        let curentCoordinat = { row: 2, cell: 2 }

        let table = document.body.querySelector("#play-field");


        createCellsInTable(table, tableSize.x, tableSize.y);
        setBox();
        setSwitchHiddenControl();
        initButton();


        function setSwitchHiddenControl() {
            let control = document.body.querySelector(".control");
            control.addEventListener('click', () => {
                let buttons = control.querySelectorAll('button');
                for (let button of buttons) {
                    switch (button.dataset.direction) {
                        case "left":
                            button.disabled = (curentCoordinat.cell == 0);
                            break;
                        case "up":
                            button.disabled = (curentCoordinat.row == 0);
                            break;
                        case "down":
                            button.disabled = (curentCoordinat.row == tableSize.x - 1);
                            break;
                        case "right":
                            button.disabled = (curentCoordinat.cell == tableSize.y - 1);
                            break;
                    }
                }
            });
        }

        function setBox() {
            table.rows[curentCoordinat.row].cells[curentCoordinat.cell].append(boxModel);
        }

        function initButton() {
            let buttons = document.body.querySelector(".control").querySelectorAll("button");

            for (let i = 0; i < buttons.length; i++) {
                let buttonDirection = buttons[i].dataset.direction

                buttons[i].addEventListener('click', chooseActionButton(buttonDirection));
            }

        }

        function chooseActionButton(buttonDirection) {
            return (event) => {
                switch (buttonDirection) {
                    case "left":
                        curentCoordinat.cell--;
                        break;
                    case "up":
                        curentCoordinat.row--;
                        break;
                    case "down":
                        curentCoordinat.row++;
                        break;
                    case "right":
                        curentCoordinat.cell++;
                        break;
                }

                let savePos = boxModel.parentElement;

                setBox();
                let rgbValueString = boxModel.parentElement.style.backgroundColor.slice(4, -1).replace(" ", "").split(',')
                console.log(boxModel.parentElement)
                console.log(savePos)
                let rgbValueNumber = [];

                for (let i = 0; i < rgbValueString.length; i++) {
                    rgbValueNumber.push(parseInt(rgbValueString[i]));
                }
                console.log(rgbValueNumber);
                console.log(document.body.querySelector("[data-type='background-color']").value)
                if (!isNaN(rgbValueNumber[0])) {
                    console.log("Я появляюсь если предыдущее не NAN");
                    console.log(rgbToHex(rgbValueNumber));
                    document.body.querySelector("[data-type='background-color']").value = rgbToHex(rgbValueNumber)
                    console.log(document.body.querySelector("[data-type='background-color']").value)
                }
            }
        }

        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        function rgbToHex(rgb) {
            return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
        }

        function createCellsInTable(table, x, y) {
            let row = document.createElement("tr");
            let cell = document.createElement("td");
            cell.style.backgroundColor = "#ffffff";

            for (let i = 0; i < x; i++) {
                row.append(cell.cloneNode());
            }
            for (let i = 0; i < y; i++) {
                table.append(row.cloneNode(true));
            }
        }