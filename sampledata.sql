
ALTER TABLE Stores Auto_increment = 1;
INSERT INTO Stores (name) 
Values ('Gamestop'), ('Gap'), ('Hot Topic'), ('Spencers');

ALTER TABLE Employees Auto_increment = 1;
INSERT INTO Employees (first_name, last_name, store_id) 
VALUES ('James', 'Massey', 1), ('Josh', 'Kimler', 2), ('Whitney', 'Wash', 1), ('Jerry', 'Jones', 3);

ALTER TABLE Items Auto_increment = 1;
INSERT INTO Items (quantity, name, price)
VALUES (10, 'PS5', 450.00), (12, 'Nintendo Switch', 300.00), (21, 'Black Eyeliner', 4.50), (13, 'Shock Rings', 11.50), (34, 'Flip Flops', 15.00);

ALTER TABLE Transactions Auto_increment = 1;
INSERT INTO Transactions (date, total, e_id, store_id)
VALUES ('2021-05-01', 750.00, 1, 1), ('2020-12-25', 16.00, 4, 3), ('2021-01-01', 15.00, 2, 2);

INSERT INTO Transaction_Items (item_id, t_id)
VALUES (1, 1), (2, 1), (3, 2), (4, 2), (5, 3);

INSERT INTO Store_Item (store_id, item_id)
VALUES (1, 1), (1, 2), (2, 5), (3, 3), (3, 4);

