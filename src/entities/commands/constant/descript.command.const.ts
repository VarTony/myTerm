const cdDesc = { 
    description: `
    cd - Change directory: Позволяет поменять директорию 
    Структура комманды:
        cd [ option: флаг ]
           [ argument: путь к директории ]
        
            Пример команды: cd ./dir
    `,
    flagDiscription: {
        '-h': 'Вывести информацию о команде'
    }
 };

const catDesc = { 
    description: `
    cat - Concatenate: Читает файл и выводит информацию.
    Структура комманды: 
    cat [ option: флаг/кодировка ]  
        [ argument: путь к читаемому файлу ]

        Пример команды: cat ./file.txt
    `,
    flagDiscription: {
        '-h': 'Вывести информацию о команде'
    }
 };


const cpDesc = { 
    description: `
    cd - Copy: Копировать файл или дерикторию 
    Структура комманды: 
     cd [ option: флаг ] 
        [ argument_1: путь к копируемому файлу/директории ]
        [ argument_2: путь к директории в которую будет совершено копирование  ]
        
        Пример команды: cp -r ./dir ./copy_dir
    `,
    flagDiscription: {
        '-r': ' Копировать папку рекурсивно',
        '-f': 'Удалить файл назначения перед попыткой записи в него если он существует',
        '-b': 'Cоздать резервную копию файла назначения если он существует',
        '-h': 'Вывести информацию о команде'
    }
 };


const lsDesc = { 
    description: `
    ls - List structure: Показывает структуру каталога
    Структура комманды: 
     ls [ option: флаг ] 
        [ argument: путь к читаемой директории ]
        
        Пример команды: rm -r ./copy_dir
    `,
    flagDiscription: {
        '-r': 'Вывод директории с отображением поддерикторий',
        '-a': 'Ввыводить все файлы, включая скрытые.',
        '-m': 'Мета информация о дериктории',
        '-h': 'Вывести информацию о команде'
    }
 };

 
const rmDesc = { 
    description: `
    rm - Remove: Удаляет  файл или дерикторию
    Структура комманды: 
     rm [ option: флаг ] 
        [ argument: путь к копируемому файлу/директории ]
        
        Пример команды: rm -r ./copy_dir
    `,
    flagDiscription: {
        '-r': 'Удаление директорий и их содержимого (рекурсивное удаление).',
        '-v': 'Выводит информацию об удаленных файлах/диреекториях',
        '-t': 'В случае удаления директории выводит удаленную структуру в формате дерева',
        '-h': 'Вывести информацию о команде'
    }
 };


const pwdDesc = { 
    description: `
    pwd -  Print working directory: Вывести полный путь до текущей рабочей директории
    Структура комманды:
    pwd [ option: флаг ] 
        
        Пример команды: pwd
    `,
    flagDiscription: {
        '-h': 'Вывести информацию о команде'
    }
 };


const touchDesc = { 
    description: `
    touch -  Touch: Создать пустой файл
    Структура комманды:
        touch [ option: флаг ]
              [ argument: путь к создаваемому файлу ]
        
               Пример команды: touch ./file.txt 
    `,
    flagDiscription: {
        '-h': 'Вывести информацию о команде'
    }
 };


const mkdirDesc = { 
    description: `
    mkdir -  Make directory: Создать пустую директорию
    Структура комманды:
        touch [ option: флаг ]
              [ argument: путь к создаваемой директории ]
        
               Пример команды: mkdir ./myDir
    `,
    flagDiscription: {
        '-h': 'Вывести информацию о команде'
    }
 };


const helpDesc = {
    description: `
                        -------myTerm-------

    Данный терминал обладает следющими командами:

        ${ cdDesc }

        ${ pwdDesc }

        ${ cpDesc }

        ${ catDesc }

        ${ lsDesc }

        ${ mkdirDesc }

        ${ touchDesc }

        ${ rmDesc }

    `
}



const descripionCommands = {
    help: helpDesc,
    pwd: pwdDesc,
    cd: cdDesc,
    cp: cpDesc,
    cat: catDesc,
    ls: lsDesc,
    mkdir: mkdirDesc,
    touch: touchDesc,
    rm: rmDesc,
};

export { descripionCommands };