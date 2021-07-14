<?php

namespace App\Tests;

use App\Managers\CalculatorManager;
use PHPUnit\Framework\TestCase;

class CalculatorTest extends TestCase {

    /**
     * CalculatorManager $calculatorManager
     */
    private $calculatorManager;

    /**
     * we instanciate the calculatorManager here
     */
    protected function setUp() : void
    {
        $this->calculatorManager = new CalculatorManager();
    }

    /**
     * this test should check if addition work fine
     */
    public function testAddition() {
        $this->assertEquals(12, $this->calculatorManager->calculateWithArrayReduce('1+2+4+5'));
    }

    /**
     * this test should check if substraction work fine
     */
    public function testSubstraction() {
        $this->assertEquals(-8, $this->calculatorManager->calculateWithArrayReduce('-1+2-4-5'));
    }

    /**
     * this test should check if multiplication work fine
     */
    public function testMultiplication() {
        $this->assertEquals(3400, $this->calculatorManager->calculateWithArrayReduce('34x10x10'));
    }

    /**
     * this test should check if division work fine
     */
    public function testDivision() {
        $this->assertEquals(1, $this->calculatorManager->calculateWithArrayReduce('10÷5÷2'));
    }

    /**
     * test the full operator
     */
    public function testComplexCase() {
        $this->assertEquals(10.6, $this->calculatorManager->calculateWithArrayReduce('-1+23-6-7+2x10÷5÷5x2'));
    }

    /**
     * test the full operator
     */
    public function testComplexWithSpaceCase() {
        $this->assertEquals(-12.4, $this->calculatorManager->calculateWithArrayReduce('-1+23-  6- 7+  2x 10÷5÷5x2 -23'));
    }


    /**
     * test the error of wrong operator
     */
    public function testWrongOperator() {
        $this->assertEquals("A non-numeric value encountered",$this->calculatorManager->calc('-1+23-6-7+2*10÷5/5x2'));
    }
}