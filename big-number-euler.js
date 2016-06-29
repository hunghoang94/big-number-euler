
function cumPow(number, pow) {
    var pos = number ? number.length - 1 : -1;
    var surplus = 0;
    var cumsum = '';
    var sum;

    while (pos > 0) {
        sum = parseInt(number[pos]) * pow;

        if (surplus > 0) {
            sum += surplus;
            surplus = 0;
        }

        if (sum >= 10) {
            surplus = Math.floor(sum / 10);
            sum = sum % 10;
        }

        cumsum = sum + cumsum;
        pos--;
    }

    if (pos == 0) {
        sum = parseInt(number[pos]) * pow;

        sum += surplus;
        cumsum = sum + cumsum;
    }

    return cumsum;
}

function transformToEnableDividend (dividend, divisor) {
    var new_dividend = dividend;
    var numberOfZeroAfterComma = 0;

    while(1) {
        new_dividend += '0';
        if(Math.trunc(new_dividend / divisor) > 0) {
            break;
        }
        numberOfZeroAfterComma++;
    }

    return {
        new_dividend: new_dividend,
        numberOfZeroAfterComma: numberOfZeroAfterComma
    };
}

function findNewDividend (dividend, divisor) {
    var div_end = parseInt(dividend);

    var remainder = Math.trunc(div_end / divisor);
    var surplus = div_end - remainder * divisor;
    var result = '';

    if(surplus == 0) {
        return remainder;
    } else {
        return result += remainder;
    }
}

module.exports = {
    sum: function (string1, string2) {
        var pos1 = string1 ? string1.length - 1 : -1;
        var pos2 = string2.length - 1;
        var surplus = false;
        var cumsum = '';

        while (pos1 >= 0 && pos2 >= 0) {
            var sum = parseInt(string1[pos1]) + parseInt(string2[pos2]);

            if (surplus) {
                sum++;
                surplus = false;
            }

            if (sum >= 10) {
                surplus = true;
                sum = sum - 10;
            }

            cumsum = sum + cumsum;
            pos1--;
            pos2--;
        }

        if (pos1 < 0) {
            var pos2Left = string2.substr(0, pos2 + 1);
            if (surplus) pos2Left++;
            cumsum = pos2Left.toString() + cumsum;
        }

        if (pos2 < 0 && pos1 >= 0) {
            var pos1Left = string1.substr(0, pos1 + 1);
            if (surplus) pos1Left++;
            cumsum = pos1Left.toString() + cumsum;
        }

        return cumsum;
    },
    //sub: function (string1, string2) {
    //    var pos1 = string1 ? string1.length - 1 : -1;
    //    var pos2 = string2.length - 1;
    //    var surplus = false;
    //    var cumsub = '';
    //    var negativeNumber = false;
    //    var sub;
    //
    //    while (pos1 >= 0 && pos2 >= 0) {
    //        var num1 = parseInt(string1[pos1]);
    //        var num2 = parseInt(string2[pos2]);
    //
    //        if (surplus) {
    //            sub--;
    //            surplus = false;
    //        }
    //
    //        if(num1 > num2) {
    //            sub = num1 - num2;
    //        } else {
    //            sub = (num1 + 10) - num2;
    //            surplus = true;
    //
    //            if(pos2 = string2.length - 1) {
    //                negativeNumber = true;
    //            }
    //        }
    //
    //        cumsub = sub + cumsub;
    //        pos1--;
    //        pos2--;
    //    }
    //
    //    if (pos1 < 0) {
    //        var pos2Left = string2.substr(0, pos2 + 1);
    //        if (surplus) pos2Left--;
    //        cumsub = pos2Left.toString() + cumsub;
    //    }
    //
    //    if (pos2 < 0 && pos1 > 0) {
    //        var pos1Left = string1.substr(0, pos1 + 1);
    //        if (surplus) pos1Left--;
    //        cumsub = pos1Left.toString() + cumsub;
    //    }
    //
    //    return negativeNumber ? '-' + cumsub : cumsub;
    //},
    pow: function (number1, number2) {
        var pos1 = number1 ? number1.length - 1 : -1;
        var pos2 = number2.length - 1;
        var arr = [];
        var cumsum = '';
        var result;
        var numberOfZeroAddition = 0;

        if (pos1 >= pos2) {
            while(pos2 >= 0) {
                result = cumPow(number1, number2[pos2]);

                for (var j = 0; j < numberOfZeroAddition; j++) {
                    result = result + '0';
                }

                arr.push(result);
                pos2--;
                numberOfZeroAddition++;
            }
        }

        if (pos2 > pos1) {
            while(pos1 >= 0) {
                result = cumPow(number2, number1[pos1]);

                for (var j = 0; j < numberOfZeroAddition; j++) {
                    result = result + '0';
                }

                arr.push(result);
                pos1--;
                numberOfZeroAddition++;
            }
        }

        for (var i = 0; i < arr.length; i++) {
            cumsum = this.sum(cumsum, arr[i]);
        }

        return cumsum;
    },
    div: function(dividend, divisor){
        var div_end = parseInt(dividend);

        var remainder = Math.trunc(div_end / divisor);
        var surplus = div_end - remainder * divisor;
        var result = '';

        if(surplus == 0) {
            return result + remainder;
        } else {
            result = result + remainder + '.';

            while(result.length < 1002) {
                var old_length = result.length;
                var number = transformToEnableDividend(surplus, divisor);
                var new_remainder = findNewDividend(number.new_dividend, divisor);
                surplus = number.new_dividend - new_remainder * divisor;

                if(surplus == 0) {
                    result = result + new_remainder;
                    break;
                } else {
                    if(number.numberOfZeroAfterComma > 0) {
                        for (var i = 0; i < number.numberOfZeroAfterComma; i++) {
                            result = result + '0';
                        }
                    }
                    result = result + new_remainder;
                    if(old_length == result.length) {
                        break;
                    }
                }
            }
            return result;
        }
    }


};
