<?php
echo exec('python ../../transport_api/interface_api.py', $output);
var_dump($output);
echo 'Nothing interesting bye~';
?>