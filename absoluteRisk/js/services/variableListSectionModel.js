/* Creates a VariableList section model */
app.factory('BuildVariableListModel', ['BuildVariable', 'CacheService', '$rootScope', function(Variable, Cache, $rootScope) {
    function VariableListModel(parent) {
        var self = this;

        self.inputMethod = 'manual';
        self.section = parent;
        self.variableList = [];
    }
    VariableListModel.prototype = {
        init: function() {
            if (this.inputMethod === 'manual') {
                this.variableList.length = 0;

                /* Add a single variable to the list as default list state */
                this.addVariable();
            } else {
                /* Reset form to reset file input */
                var sectionForm = document.getElementById(this.section.id);
                sectionForm.reset();

                this.section.file = null;
            }
        },
        addVariable: function() {
            this.variableList.push(new Variable());
        },
        deleteVariable: function(index) {
            if (this.variableList.length > 1) {
                this.variableList.splice(index, 1);
            }
        },
        saveModel: function() {
            /* Validation will occur before Cache sets data, flesh out here */
            var modelData = this.getJsonModel();
            var isValid = Cache.setData('section_1', modelData);

            if (isValid) {
                this.section.setSectionState(isValid, modelData.variableList);
            }
        },
        getJsonModel: function() {
            var list = [];

            angular.forEach(this.variableList, function(variable) {
                list.push(variable.getJsonModel());
            });

            return {
                inputMethod: this.inputMethod,
                variableList: list
            };
        }
    };

    return VariableListModel;
}]);
