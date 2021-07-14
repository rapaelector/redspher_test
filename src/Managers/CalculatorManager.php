<?php

namespace App\Managers;

class CalculatorManager {
/**
 * this is responsible of calculator
 * and do the same things as calculateWithArrayReduce
 * @param $input
 * @return float|int
 */
public function calculateWithForeach($input) {
    $res = 0;
    $addParts = explode('+', $input);
    foreach ($addParts as $p2) {
        $parts2 = array_filter(explode('-', $p2), function ($v) {
            return $v;
        });
        $resSub = 0;
        foreach ($parts2 as $i => $p22) {
            if ($i > 0 || $p2[0] == '-') {
                $p22 = '-' . $p22;
            }

            $multParts = explode('x', $p22);
            $resMult = empty($multParts) ? 0 : 1;
            foreach ($multParts as $item) {
                $divParts = explode('÷', $item);
                $divRes = array_shift($divParts);
                foreach ($divParts as $divItem) {
                    $divRes = $divRes / $divItem;
                }
                $resMult = $resMult * $divRes;
            }
            $resSub += $resMult;
        }
        $res += $resSub;
    }

    return $res;
}

/**
 * level1 explode the +
 * level2 explode the -
 * level3 explode the *
 * level4 explode the /
 * this funciton will explode by +, and then calculate for each value inside the array
 * to calculate the value inside the array we will explode again by -
 * and then explode and made another foreach by multiplication
 * and then explode and made another foreach by division that sould be the first calculate
 * and the return of the foreach division explode will be multiplicate by the level2 part
 * and the result of level2 sould be aditionate with the level 1 part
 * @param $input
 * @return mixed
 */
public function calculateWithArrayReduce($input) {
    // here the part 1 is to explode the string with by delimiter +
    $part1 = explode('+', str_replace(' ', '', $input));
    return array_reduce($part1, function ($add, $l1) {
        // then here for each string exploded by + we will explode again with - sign
    $parts2 = array_filter(explode('-', $l1), function ($v) { return $v; });
    // here we make the aditional of substraction result and aditional result
    return $add + array_reduce($parts2, function($sub, $level2) use ($parts2) {
            $i = array_search($level2, $parts2);
            // here we check if index of level is superior of 0 that mean that the value was negative and should have - sign
            $level2 = ($i > 0 || ($level2[0] == '-')) ? ('-' . $level2) : $level2;
            // here we explode by x delimiter for the level 3
            $parts3 = explode('x', $level2);
            return  $sub + array_reduce($parts3, function ($mult, $level3){
                // and then we explode by division part
                    $parts4 = explode('÷', $level3);
                    return $mult * array_reduce($parts4, function ($div, $level4) use ($parts4) {
                            $j = array_search($level4, $parts4);
                            return $j === 0 ? $div : $div / $level4;
                        }, $parts4[0]);
                }, 1);

        }, 0);

},0);
}

}


