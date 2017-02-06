<?php

class Word extends CI_Model
{
	public function get_word()
	{
		$db = $this->db->distinct()->select('name')->order_by('rand()')->limit(1)->get('dict');
		return $db->row()->name;
	}
}