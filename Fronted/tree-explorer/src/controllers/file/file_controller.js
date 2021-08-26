import POST from '../http/post'
import File from '../http/file';
import Element from '../../elements/tree/objects/element';
import Responde from '../../objects/responde';


class FileController{
    static async download(){
        await File("https://localhost:5001/Elements/GetFile", {Id : Element.element.Id});
    }

}

export default FileController;