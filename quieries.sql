
/* finds phone numbers that are in both tables (test and dnctest) */
SELECT * FROM test
INTERSECT
SELECT * FROM dnctest;

/* finds the phone numbers that are in test that are not in dnctest (test and dnctest) */
SELECT * FROM test 
EXCEPT 
SELECT * FROM dnctest

/* finds the phone numbers that are in test that are not in dnctest (test and dnctest) and then out puts to csv file  */
Copy (SELECT * FROM test EXCEPT SELECT * FROM dnctest) to 'C:\\postgrestest\\nodetest\\testrestulsts.csv' DELIMITER ',';

/* imports nums from csv file into dnctest table */
COPY dnctest FROM 'C:\\postgrestest\\nodetest\\mergeddnc.csv' DELIMITER ',';

/* imports nums from csv file into dnctest table */
COPY dnctest FROM 'C:\\postgrestest\\nodetest\\mergeddnc.csv' DELIMITER ',';

/* expots table test to  csv  */
COPY test test 'C:\\postgrestest\\nodetest\\test.csv' DELIMITER ',';

ALTER TABLE companydnc ADD COLUMN id BIGSERIAL PRIMARY KEY;

create index phonenums_idx on test(phonenums)

SELECT COUNT(*) FROM TABLE_NAME;

select * from clients 
except 
select * from vips 
except
select * from execs

select * from clients 
except 
(select * from vips union select * from execs)

COPY dirtyleads FROM 'leadsfilename' DELIMITER ','; 

TRUNCATE dirtyleads 