

function Validator(options) {
    // Function is used to get parent element of input element
    var formElement = $(options.form);
    var selectorRules = {};
    // Function is used to validate input field
    function validate(inputElement, rule) {
        var errorMessage;
        var parentElement = $(inputElement).parents(options.formGroupSelector);
        var rules = selectorRules[rule.selector];
        for (var i = 0; i < rules.length; i++) {
            switch(inputElement.type){
                case 'checkbox':
                case 'radio':
                    errorMessage = rules[i](
                        formElement.find(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i]($(inputElement).val());
            }
            if (errorMessage) break;
            
        }
        var errorElement = parentElement.find(options.errorSelector);
        if (errorMessage) {
            errorElement.text(errorMessage);
            parentElement.addClass('invalid');
        }
        else {
            errorElement.text('');
            parentElement.removeClass('invalid');
        }
        return !errorMessage;
    }

    if (formElement) {
        // 
        $('.submit-btn').click(function (e) {
            // Validate all input field when submit form
            e.preventDefault();
            var isFormValid = true;

            options.rules.forEach(function (rule) {
                var inputElement = formElement.find(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });
            // Case all input field are valid -> submit data
            if (isFormValid) {
                // Case use Javascript function
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.find('[name]:not([disable])');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        switch(input.type){
                            case 'checkbox':
                            case 'radio':
                                values[input.name] = formElement.find('input[name="' + input.name +'"]:checked').value;
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        
                        return values;
                        
                    },{});

                    options.onSubmit(formValues);
                }
                // Default case
                else{
                    // formElement.onSubmit();
                }
                
            }
            // Case exists invalid input field -> error measage
            else {
                console.log('Có lỗi');
            }

        })
        options.rules.forEach(function (rule) {
            //Store rules of each input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test]
            }
            var inputElements = formElement.find(rule.selector);
            
            Array.from(inputElements).forEach(function(inputElement){
                // Validate when user leave input field
                $(inputElement).blur(function () {
                    validate(inputElement, rule);
                })
                // Remove error message when user enter
                $(inputElement).change(function () {
                    var parentElement = $(inputElement).parents(options.formGroupSelector);
                    var errorElement = parentElement.find(options.errorSelector);
                    errorElement.text('');
                    parentElement.removeClass('invalid');
                })
            })
                
            
        });
    }
}


// Define rules
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = function (selector, errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : errorMessage || 'Trường này phải là email';
        }
    }

}
Validator.isConfirmed = function (selector, getConfirmValue, errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            return (value === getConfirmValue()) ? undefined : errorMessage || 'Mật khẩu không khớp';
        }
    }
}

