"use strict";

const logoutBtn = new LogoutButton();
logoutBtn.action = function () {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    })
}


ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    }
})


const ratesBoard = new RatesBoard();
ApiConnector.getStocks(response => {
    if (response.success) {
        console.log(ratesBoard);
        console.log(ratesBoard.tableBody);
        console.log(ratesBoard.fillTable);
        ratesBoard.fillTable(response.data);
        console.log(ratesBoard.clearTable);
        console.log(ratesBoard.tableBody.innerHTML);
        ratesBoard.cleartable();
    }
})
//setInterval(ApiConnector.getStocks, 1000);
/*const moneyManager = new MoneyManager();*/
