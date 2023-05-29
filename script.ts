let tableSize: { x: number, y: number } = { x: 5, y: 5 }

let boxModel: HTMLDivElement = document.createElement('div');
boxModel.className = 'box';
boxModel.style.backgroundColor = (document.body
    .querySelector("[data-type='element-color']") as HTMLInputElement).value;

document.body.querySelector("[data-type='element-color']")
    ?.addEventListener('change', (event: Event) =>
        boxModel.style.backgroundColor = (event.target as HTMLInputElement).value
    );

document.body.querySelector("[data-type='background-color']")
    ?.addEventListener('change', (event) =>
        (boxModel.parentElement as HTMLTableCellElement)
            .style.backgroundColor = (event.target as HTMLInputElement).value
    );

let curentCoordinat: { row: number, cell: number } = { row: 2, cell: 2 };


let table: HTMLTableElement | null = document.body.querySelector("#play-field");
if (table != null){
    createCellsInTable(table, tableSize.x, tableSize.y);
}
setBox();
setSwitchHiddenControl();
initButton();

function setSwitchHiddenControl() {
    let control: HTMLDivElement | null = document.body.querySelector(".control");
    if (control === null) return;

    control.addEventListener('click', () => {
        let buttons: NodeListOf<HTMLButtonElement> | undefined = control?.querySelectorAll('button');
        if (typeof buttons == 'undefined') return;

        for (let i = 0; i < buttons.length; i++){
            let button: HTMLButtonElement = buttons[i];
            
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
    table?.rows[curentCoordinat.row].cells[curentCoordinat.cell].append(boxModel);
}

function initButton() {
    let buttons = document.body.querySelector(".control")?.querySelectorAll("button");
    if (typeof buttons == 'undefined') return;

    for (let i = 0; i < buttons.length; i++) {
        let buttonDirection = buttons[i].dataset.direction
        if (typeof buttonDirection == 'undefined') return;
        buttons[i].addEventListener('click', chooseActionButton(buttonDirection));
    }

}

function chooseActionButton(buttonDirection: string) {
    return (event: Event) => {
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
        if (boxModel.parentElement == null) return;
        let rgbValueString = boxModel.parentElement.style.backgroundColor.slice(4, -1).replace(" ", "").split(',')
        let rgbValueNumber: number[] = [];

        for (let i = 0; i < rgbValueString.length; i++) {
            rgbValueNumber.push(+rgbValueString[i]);
        }
        if (!isNaN(rgbValueNumber[0])) {
            let backgroundColorPicker: HTMLInputElement | null = document.body.querySelector("[data-type='background-color']");
            if (backgroundColorPicker == null) return;
            backgroundColorPicker.value = rgbToHex(rgbValueNumber);
        }
    }
}

function componentToHex(number: number) {
    var hex = number.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb: number[]) {
    return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
}

function createCellsInTable(table: HTMLTableElement, x: number, y: number) {
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