    $.validator.addMethod("invalidOption", function (value, element, params) {
        return value != params;
    });

    var validationRules = {
        history: {
            required: true,
            invalidOption: 0
        },
        mutation: {
            required: true,
            invalidOption: 0
        },
        age: {
            required: true,
            min: 35,
        },
        race: {
            required: true
        },
        sub_race: {
            required: {
                depends: function () {
                    return Number($("#race").val()) === 3;
                }
            }
        },
        age_period: {
            required: true
        },
        childbirth: {
            required: true
        },

        childbirth_age: {
            required: {
                depends: function () {
                    return Number($("[name='childbirth']").val()) === 0;
                }
            }
        },

        relatives: {
            required: true
        },
        biopsy: {
            required: true
        },

        biopsy_result: {
            required: {
                depends: function () {
                    return Number($("[name='biopsy']").val()) === 0;
                }
            }
        },

        biopsy_ah: {
            required: {
                depends: function () {
                    return Number($("[name='biopsy']").val()) === 0;
                }
            }
        },
    };

    var validationMessages = {
        history: {
            required: "You must answer the history of DCIS or LCIS question",
            invalidOption: "This tool cannot calculate breast cancer risk accurately for women with a medical history of any breast cancer or of DCIS or LCIS. See the 'About' page for more information."
        },
        mutation: {
            required: "You must answer the (BCRA gene / genetic mutation) question",
            invalidOption: 'Other tools may be more appropriate for women with known mutations in either the BRCA1 or BRCA2 gene, or other hereditary syndromes associated with higher risk of breast cancer. See the \"About\" page for more information.'
        },
        age: {
            required: "The woman's age is required",
            min: "This tool only calculates breast cancer risk for women that are 35 or older"
        },
        race: {
            required: "You must select the woman's race"
        },
        sub_race: {
            required: "You must select the woman's sub race"
        },

        age_period: {
            required: "You must enter the woman's age when she first had her period"
        },

        childbirth: {
            required: "You must select whether the woman has ever given birth"
        },

        childbirth_age: {
            required: "You must enter the age of woman when she first gave birth"
        },

        relatives: {
            required: "You must select whether the woman's immediate relatives ever had breast cancer"
        },

        biopsy: {
            required: "You must select whether the woman ever had a breast biopsy"
        },

        biopsy_result: {
            required: "You must select how many breast biopsies the woman had"
        },

        biopsy_ah: {
            required: "You must select whether any biopsies had atypical hyperplasia"
        },

    };

    function validate() {
        $(document.forms.survey).validate({
            highlight: highlightErrorElement,
            unhighlight: removeHighlightErrorElement,
            rules: validationRules,
            messages: validationMessages,
            errorLabelContainer: '#error',
            wrapper: 'p',
            submitHandler: processSubmission
        });
    }

    $(validate);

    $(".thumbnail").on("click", expandCollapseImage);

    $("[name='race']").on("change", function () {
        if (Number(this.value) == 3) {
            var aa_subraces = "<option value=''>Select</option><option value='0'>Chinese</option><option value='1'>Japanese</option><option value='2'>Filipino</option><option value='3'>Hawiian</option><option value='4'>Other Pacific Islander</option><option value='5'>Other Asian American</option>";
            $("#subquestion-race").addClass("show");
            $("select#sub_race").empty().append(aa_subraces);
        } else
            $("#subquestion-race").removeClass("show");
    });

    $("[name='childbirth']").on("change", function () {
        if (Number(this.value) === 0)
            $("#subquestion-childbirth-age").addClass("show");
        else
            $("#subquestion-childbirth-age").removeClass("show");
    });

    $("[name='biopsy']").on("change", function () {
        if (Number(this.value) === 0)
            $("#subquestion-biopsy,#subquestion-biopsy-ah").addClass("show");
        else
            $("#subquestion-biopsy,#subquestion-biopsy-ah").removeClass("show");
    });

    $("#reset").on("click", function () {
        $(survey).validate().resetForm();
        $(".show").removeClass("show");
    });


$(function(){
    var titles = {
        "risk-calculator": "Risk Calculator",
        "about": "About",
        "risk-factors": "Breast Cancer Risk Factors",
        "source-code": "Access Source Code"
    };

    $('.goTo').on('click', function() {
        $("html, body").animate({
            scrollTop: $(this.name).offset().top - $("header")[0].clientHeight
        }, 1000);
    });

    $('#content').on('click','[tabTo]',function(e) {
        document.title  =  "Breast Risk Assessment Tool (BCRAT) | " +
            titles[$(this).attr('tabTo')];
    });
});