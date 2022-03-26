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
function updateRatesBoard() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
            setTimeout(updateRatesBoard, 60000);
        }
    })
}
updateRatesBoard()


const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            this.setMessage(response.success, 'Действие выполнено успешно.');
        } else {
            this.setMessage(response.success, response.error);
        }
    })
}

moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            this.setMessage(response.success, 'Действие выполнено успешно.');
        } else {
            this.setMessage(response.success, response.error);
        }
    })
}

moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            this.setMessage(response.success, 'Действие выполнено успешно.');
        } else {
            this.setMessage(response.success, response.error);
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
            this.setMessage(response.success, this.favoritesMessageBox.innerText);
        } else {
            this.setMessage(response.success, response.error);
        }
    })
}

favoritesWidget.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            this.setMessage(response.success, 'Действие выполнено успешно.');
        } else {
            this.setMessage(response.success, response.error);
        }
    })
}