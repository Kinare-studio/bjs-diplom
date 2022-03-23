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
        setInterval(() => {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }, 1000);
    }
}
)

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            this.setMessage(response, this.errorMessageBlock.innerText);  
        }
    })
}

moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            console.log(this.setMessage)
            this.setMessage();
        }
    })
}

moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            this.setMessage(); 
        }
    })
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoritesWidget.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            this.setMessage(); 
        }
    })
}

favoritesWidget.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            this.setMessage(); 
        }
    })
}