using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VakifBank.DSA.YHB.MobileApi.Adapters.Providers;
using VakifBank.DSA.YHB.MobileApi.Adapters.SOkulTahsilatMobilSahaSatisServiceReference;
using VakifBank.DSA.YHB.MobileApi.Messages.Core;
using VeriPark.MobileApi.Contracts;

namespace VakifBank.DSA.YHB.MobileApi.Adapters.SOkulTahsilatMobilSahaSatis
{
    public abstract class BaseGetirOkulAdapter<Request, Response> : BaseAdapterOperation, IFetchAdaptorOperation<Request, Response> 
        where Response :  IResponseData, new() 
        where Request : IRequestData
    {
        public Response Dispatch(Header header, Request request, out Footer footer)
        {
            var response = new Response();
            try
            {
                var serviceRequest = SOkulTahsilatMobilSahaSatisServiceProvider.GenerateRequest<OkulBilgisiTalep>(header);
                var serviceResponse = Loggers.Performance.ExecuteMeasure(() => GetIntelligenceDispatch(serviceRequest));
                footer = SOkulTahsilatMobilSahaSatisServiceProvider.ConstructFooter(serviceResponse);
                if (!footer.IsSuccess)
                {
                    return response;
                }
                MapServiceResponse(serviceResponse, response, request);
            }
            catch (Exception ex)
            {
                footer = GenerateFooterFromException(ex);
            }
            return response;
        }

        private OkulBilgisiCevap GetIntelligenceDispatch(OkulBilgisiTalep serviceRequest)
        {
            var client = new SOkulTahsilatMobilSahaSatisClient();
            try
            {
                return client.GetirOkulBilgisi(serviceRequest);
            }
            finally
            {
                client.CloseAndCleanUp();
            }
        }
        protected abstract void MapServiceResponse(OkulBilgisiCevap serviceResponse, Response response, Request request);
    }
}
