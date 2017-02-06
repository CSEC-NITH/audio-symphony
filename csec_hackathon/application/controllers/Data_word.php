<?php

class Data_word extends CI_Controller
{
	public function get_word()
	{
		$this->load->model('Word');
		$res = $this->Word->get_word();
		print_r($res);
	}
}