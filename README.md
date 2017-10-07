# audio-symphony

### An Audio Visualiser, Synthesizer, Recognizer.

  This Project was created in Hack 1.0 organised by CSEC on 04/05-02-2016.

  Our team included:
  
   * Saurabh Kumar: [https://github.com/saurabh0402] (https://github.com/saurabh0402)
   * Mukesh Kumar Kharita: [https://github.com/mukeshkharita](https://github.com/mukeshkharita)
   * Shubham Kumar Jain: [https://github.com/skj007](https://github.com/skj007)
   * Swati: [https://github.com/swati66](https://github.com/swati66)
   
   
### Instructions
   * Install php7.0, MySQL, and Apache2 on your system.
                 
                 sudo apt-get update
                 sudo apt-get install apache2
                 sudo apt-get install mysql-server
                 sudo mysql_secure_installation
                 sudo apt-get install php libapache2-mod-php php-mcrypt php-mysql
                 apt-get install php7.0-mysqlnd
   * Open /etc/php/7.0/apache2/php.ini and find php_mysqli.dll and uncomment that statement.
   * Create a database and in it create a table named dict with a single column name.
   
                 create table dict (name varchar(100) not null);
   * Open csec_hackathon/application/config/database.php and add your database, username, and password at their respective positions.
   * Restart the server
   
                 sudo service apache2 restart
   * Clone the repo and paste the folder in /var/www/html
   * Point your browser to 
   
                  127.0.0.1/audio-symphony
   * For any error during installation ping Mukesh on [mukeshnithcse@gmail.com](mailto:mukeshnithcse@gmail.com)
   * If you want to contribute, send us a pull request. We will be happy to merge it.

### This project works only on chrome
