export default{
    VIEWNAME:{
        HOME: Symbol('HOME'),
        LIST: Symbol('LIST'),
        PROFILE: Symbol('PROFILE')
    },
    DEFAULT_IMAGE_PATH: 'http://via.placeholder.com/350x350',
    getImgPath: function(filepath){
        return require('../assets/img/' + filepath);
    }
}