    var nivel = 1;
    var palavras = [];
    var ntempo = 15;
    var tempo = null; 
    var QUANTPALAVRAS = 5;  

    $(function(){
        $("#verpalavra").attr("disabled", true)//desabilita a digitação no input

        $("#digitarpalavra").on("keyup",function(){//checagem ao clicar no input de digitação
            if(palavras.length>0 && $("#digitarpalavra").val().toUpperCase()===palavras[0].toUpperCase()){//verifica se foi digitado correto
                $("#resultado").text("Correto");
                $("#resultado").show();
                setTimeout(function (){ $("#resultado").hide()},500)
                palavras. splice(0, 1);//remove o item
                $("#verpalavra").val(palavras[0])
                $("#digitarpalavra").val("")
                $("#restante").text(palavras.length.toString())
            }
        })

        $("#iniciar").on("click",function(){//botão de inicio
            reset();
            buscarPalavras(QUANTPALAVRAS);
        });


        function verificaSeGanhou(){
            if(palavras.length==0&&ntempo>0){
                alert("Proximo Nivel!")
                clearInterval(tempo) 
                proxNivel();//abrir 
            }else if(palavras.length>0 && ntempo<=0){//se ainda restar palavras e o tempo acabar
                alert("Tente Novamente: Nivel alcançado: "+nivel)
                clearInterval(tempo)
                reset();
                $("#iniciar").show()
                $("#panelgame").hide()
                console.log("Condicao 2")
            }
            else{
                decrementaTempo();
                console.log("Condicao 3")
            }
        }
        function buscarPalavras(qnt){//consulta a api
            $.ajax({
             method:'GET',
             url: 'https://gerador-nomes.wolan.net/nomes/'+qnt.toString(),//api
             success:function(data,textStatus){//caso a consulta seja feita com sucesso.
                palavras = data;
                console.log(palavras)
                $("#iniciar").hide()
                $("#panelgame").show();
                $("#verpalavra").val(palavras[0])
                $("#restante").text(palavras.length.toString())
                $("#panelgame")
                if(tempo!=null)
                    clearInterval(tempo);
                tempo = setInterval(function(){
                    verificaSeGanhou();
                    
                },1000);
             }
         }).fail(function(jqXHR, textStatus, msg){
                 alert("Error ao buscar palavras: "+textStatus+" "+msg+" "+jqXHR);
         }); 
        }

        function decrementaTempo(){ 
           ntempo =  ntempo-1<=0?0:ntempo-1;
           setTempo();
        }

        function setTempo(){//atualiza o tempo na tela.
            $('#cronometro').text(ntempo.toString()+"  s")   
            // if(ntempo==0)
            //     clearInterval(tempo)    
        }

        function reset(){
            nivel = 1
            palavras = []
            tempo = null;
            ntempo = 30;
            QUANTPALAVRAS = 5;
            $('#cronometro').text(ntempo.toString()+" s");
            $("#verpalavra").val("Aguarde...");
            $("#restante").text(palavras.length.toString())
            $("#digitarpalavra").val("")
            
        }
        function proxNivel(){
            nivel += 1;
            palavras = []
            tempo=null;
            ntempo = 30;
            QUANTPALAVRAS = 5+nivel;//as palavras aumentam de acordo o nível.
            $('#cronometro').text(ntempo.toString()+"s");
            $("#verpalavra").val("Aguarde...");
            $("#restante").text(palavras.length.toString())
            $("#digitarpalavra").val("")
            buscarPalavras( QUANTPALAVRAS );
        }
        reset();
        // $.get("https://gerador-nomes.herokuapp.com/nomes/45",function(data,status){
        //     alert("Data: " + data + "\nStatus: " + status);
        // });
    })//fim jquery
