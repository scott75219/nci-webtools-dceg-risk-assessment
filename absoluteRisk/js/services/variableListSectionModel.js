/* Creates a VariableList section model */
app.factory('BuildVariableListModel', ['BuildVariable', 'CacheService', '$rootScope', function(Variable, Cache, $rootScope) {
    function VariableListModel(parent) {
        var self = this;

        self.inputMethod = 'manual';
        self.section = parent;
    }
    VariableListModel.prototype = {
        init: function() {
            this.variableList = [];

            /* Add a single variable to the list as default list state */
            this.addVariable();
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
            var self = this;
            var isValid = Cache.setData('section_1', this.getJsonModel());

            self.section.setSectionState(isValid);
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