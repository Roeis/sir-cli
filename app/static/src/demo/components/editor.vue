<style lang="scss">

    .editor-toolbar{


        ul{
            display: flex;
            flex-wrap: wrap;
        }
        li{
            padding: 0;
            margin: 10px;
            // cursor: pointer;
            a{
                padding: 10px;
                background-color: #eee;
                display: block;
                &:hover{
                    background-color: #f90;
                    color: #fff;
                }
            }
        }
    }
    .editor{
        resize: vertical;
        line-height: 1.5;
        img{
            max-width: 100%;
        }
    }
</style>

<template lang="html">
    <div class="v-editor">
        <div class="editor-toolbar">
            <ul>
                <li v-for="item in list"><a href="javascript:;" @click="command(item)"><span>{{ item }}</span></a></li>
            </ul>
            <ul>
                <li v-for="item in custom"><a href="javascript:;" @click="customHandler(item)"><span>{{item}}</span></a></li>
            </ul>
        </div>
        <div class="editor" contenteditable="true" @input="watch">

        </div>
    </div>

</template>

<script>

export default {
    data(){
        return {
            list: [
                'foreColor',
                'backColor',
                'bold',
                'italic',
                'underline',
                'strikeThrough',

                'justifyLeft',
                'justifyCenter',
                'justifyRight',
                'justifyFull',

                'subscript',
                'superscript',
                'fontSize',
                'formatBlock',
                'removeFormat'
            ],
            custom: [
                'insertHTML'
            ]
        }
    },

    methods: {
        watch(event){
            console.log(event);
        },
        customHandler(){
            let html = '<img src="/assets/upload/upload_2017977ba243009ff3c41a932305aea0.jpg"/>'
            document.execCommand('insertHTML', false, html);
        },
        command(type){
            console.log(type);
            /**
             * https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
             *
             * support list
             *
             * backColor
             * bold
             * contentReadOnly
             * copy
             * createLink
             * cut
             * decreaseFontSize
             * delete
             * enableInlineTableEditing
             * enableObjectResizing
             * fontName
             * fontSize
             * foreColor
             * formatBlock
             * forwardDelete
             * heading
             * hiliteColor
             * increaseFontSize
             * indent
             * insertBrOnReturn
             * insertHorizontalRule
             * insertHTML
             * insertImage
             * insertOrderedList
             * insertUnorderedList
             * insertParagraph
             * insertText
             * italic
             * justifyCenter
             * justifyFull
             * justifyLeft
             * justifyRight
             * outdent
             * paste
             * redo
             * removeFormat
             * selectAll
             * strikeThrough
             * subscript
             * superscript
             * underline
             * undo
             * unlink
             *
             *
             *
             */
            switch(type){
                case 'formatBlock':
                    document.execCommand(type, false, 'h2');
                    break;
                default:
                    document.execCommand(type, false, null);
                    break;
                }

        }
    }

}

</script>
