<?php
  $receiving_email_address = 'toto6po69@gmail.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  $contact->add_message( $_POST['name'], 'From');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['message'], 'Message', 10);

  echo $contact->send();

  class PHP_Email_Form {
    public $to;
    public $from_name;
    public $from_email;
    public $subject;
    public $smtp;
    public $ajax = false;
    private $messages = array();

    public function add_message( $message, $type, $min_length = 0 ) {
        $this->messages[$type] = $message;
        return $this;
    }

    public function send() {
        if( empty($this->to) || empty($this->from_name) || empty($this->from_email) || empty($this->subject) || empty($this->messages) ) {
            return json_encode(array('type'=>'danger', 'msg'=>'Required fields are missing!'));
        }

        $headers = "From: {$this->from_name} <{$this->from_email}>\r\n";
        $headers .= "Reply-To: {$this->from_email}\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        $body = "";
        foreach( $this->messages as $type => $message ) {
            $body .= ucfirst($type).":\n\n";
            $body .= $message."\n\n";
            $body .= "-------------------------\n\n";
        }

        $body .= "\n\n--End of Message--";

        if( mail($this->to, $this->subject, $body, $headers) ) {
            return json_encode(array('type'=>'success', 'msg'=>'Email has been sent successfully!'));
        } else {
            return json_encode(array('type'=>'danger', 'msg'=>'An error occurred. Please try again later.'));
        }
    }
}
?>
