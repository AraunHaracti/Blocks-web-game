var _a, _b;
var tableSize = { x: 5, y: 5 };
var boxModel = document.createElement('div');
boxModel.className = 'box';
boxModel.style.backgroundColor = document.body
    .querySelector("[data-type='element-color']").value;
(_a = document.body.querySelector("[data-type='element-color']")) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function (event) {
    return boxModel.style.backgroundColor = event.target.value;
});
(_b = document.body.querySelector("[data-type='background-color']")) === null || _b === void 0 ? void 0 : _b.addEventListener('change', function (event) {
    return boxModel.parentElement
        .style.backgroundColor = event.target.value;
});
var curentCoordinat = { row: 2, cell: 2 };
var table = document.body.querySelector("#play-field");
if (table != null) {
    createCellsInTable(table, tableSize.x, tableSize.y);
}
setBox();
setSwitchHiddenControl();
initButton();
function setSwitchHiddenControl() {
    var control = document.body.querySelector(".control");
    if (control === null)
        return;
    control.addEventListener('click', function () {
        var buttons = control === null || control === void 0 ? void 0 : control.querySelectorAll('button');
        if (typeof buttons == 'undefined')
            return;
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
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
    table === null || table === void 0 ? void 0 : table.rows[curentCoordinat.row].cells[curentCoordinat.cell].append(boxModel);
}
function initButton() {
    var _a;
    var buttons = (_a = document.body.querySelector(".control")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("button");
    if (typeof buttons == 'undefined')
        return;
    for (var i = 0; i < buttons.length; i++) {
        var buttonDirection = buttons[i].dataset.direction;
        if (typeof buttonDirection == 'undefined')
            return;
        buttons[i].addEventListener('click', chooseActionButton(buttonDirection));
    }
}
function chooseActionButton(buttonDirection) {
    return function (event) {
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
        setBox();
        if (boxModel.parentElement == null)
            return;
        var rgbValueString = boxModel.parentElement.style.backgroundColor.slice(4, -1).replace(" ", "").split(',');
        var rgbValueNumber = [];
        for (var i = 0; i < rgbValueString.length; i++) {
            rgbValueNumber.push(+rgbValueString[i]);
        }
        if (!isNaN(rgbValueNumber[0])) {
            var backgroundColorPicker = document.body.querySelector("[data-type='background-color']");
            if (backgroundColorPicker == null)
                return;
            backgroundColorPicker.value = rgbToHex(rgbValueNumber);
        }
    };
}
function componentToHex(number) {
    var hex = number.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(rgb) {
    return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
}
function createCellsInTable(table, x, y) {
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    cell.style.backgroundColor = "#ffffff";
    for (var i = 0; i < x; i++) {
        row.append(cell.cloneNode());
    }
    for (var i = 0; i < y; i++) {
        table.append(row.cloneNode(true));
    }
}
