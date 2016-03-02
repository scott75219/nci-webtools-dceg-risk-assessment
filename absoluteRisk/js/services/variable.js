/* Creates a Variable object */
app.factory('BuildVariable', function() {
    function Variable() {
        var self = this;
        /* Check for passed in JSON cfg at later time */

        self.name = '';
        self.type = 'continuous';
        self.levels = '';
        self.levelsType = 'string';
        self.ref = '';
    }
    Variable.prototype = {
        convertLevelsToArray: function() {
            var l = this.levels.split(' ');

            if (this.levelsType === 'integer') {
                angular.forEach(l, function(value, index) {
                    l[index] = parseInt(value, 10);
                });
            }

            return l;
        },
        getJsonModel: function() {
            var self = this;
            var levelsObj = self.convertLevelsToArray();

            return {
                name: self.name,
                type: self.type,
                levels: levelsObj,
                ref: self.ref ? self.ref : levelsObj[0]
            };
        }
    };

    return Variable;
});