const mysql = require("mysql");

// This function return a response with all of a user's currency-wallets
exports.viewAllCurrencyWallets = (req, res) => {
  const username = req.body.username;

  const sql = `SELECT u.id, u.name, w.name FROM user u LEFT JOIN wallet w on u.id = w.user_id WHERE u.name = ${username}`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error("You do not have any currency wallets.");
    }
    res.status(200).json({
      status: 200,
      data: {
        results,
      },
    });
  });
};
