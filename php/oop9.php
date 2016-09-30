<?php
abstract class Person {
  public $name;
  public $age;
  public $gender;

  public function __construct($name, $age, $gender) {
    $this->name = $name;
    $this->age = $age;
    $this->gender = $gender;
  }
  
  abstract public function introduce();
  
  public function greet($name) {
    return "Hello $name";
  }
}

final class Child extends Person {
  public $aspirations;
  
  public function __construct($name, $age, $gender, $aspirations) {
    parent::__construct($name, $age, $gender);
    $this->aspirations = $aspirations;
  }
  
  public function introduce() {
    return "Hi, I'm $name and I am $age years old";
  }
  
  public function greet($name) {
    return "Hi $name, let's play!";
  }
  
  public function say_dreams() {
    return "I would like to be a(n) say_list($this->aspirations) when I grow up.";
  }
}

class ComputerProgrammer extends Person {
  public $occupation = "Computer programmer";
  
  public function __construct($name, $age, $gender) {
    parent::__construct($name, $age, $gender);
  }
  
  public function introduce() {
    return "Hello, my name is $name, I am $age years old and I am a(n) $this->occupation";
  }
  
  public function greet($name) {
    return parent->greet($name) .", I'm $this->name, nice to meet you";
  }
  
  public function advertise() {
    return "Don't forget to check out my coding projects";
  }
}